"use client";
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThumbsUp, Music, Youtube, Plus, Share2, ThumbsDown } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import axios from "axios";

// @ts-ignore
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Appbar } from "../components/Appbar";
import { Redirect } from "../components/Redirect";


interface Video {
	"id": string,
	"type": string,
	"url": string,
	"extractedId": string,
	"title": string,
	"smallImg": string,
	"bigImg": string,
	"active": boolean,
	"userId": string,
	"upvotes": number,
	"haveUpvoted": boolean
}

const REFRESH_INTERVAL_MS = 10000;
export default function StreamPlayer() {
  const [videosQueue, setVideosQueue] = useState<Video[]>([])
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null)
  const [newVideoUrl, setNewVideoUrl] = useState('')

  
  async function refreshStreams () {
    const res = await axios.get('/api/streams/my');
    console.log('refresh', res);
    setVideosQueue(res.data.streams);
	}

  useEffect(() => {

    refreshStreams();

    const interval = setInterval(() => {
        //refreshStreams();
    }, REFRESH_INTERVAL_MS);

		return () => {
			if(interval)
				clearInterval(interval);
		}
  }, [])
  
	const handleVote = async (video: Video ) => {

		setVideosQueue(videosQueue.map(_video => 
			_video.id === video.id  ? { 
				..._video, 
				upvotes: _video.upvotes + (video.haveUpvoted? -1: 1), 
				haveUpvoted: !video.haveUpvoted  
			} : _video
		).sort((a, b) => b.upvotes - a.upvotes))
  
		try {
			let res = await fetch(`/api/streams/${video.haveUpvoted ? "downvote": "upvote"} `, {
				method: "POST",
				body: JSON.stringify({
					"streamId": video.id,
				})
			})
			if(!(res.status == 200 || res.status == 201)) {
				setVideosQueue(videosQueue.map(_video => _video).sort((a, b) => b.upvotes - a.upvotes))
			}
		}
		catch(error) {
			setVideosQueue(videosQueue.map(_video => _video).sort((a, b) => b.upvotes - a.upvotes))
		}
  }

  // const handleNextVideo = () => {
  //   setCurrentVideo(videosQueue.next()) 
  // }

  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null 
  }

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault()
		const youtubeId = extractYoutubeId(newVideoUrl)

		let res = await fetch(`/api/streams `, {
			method: "POST",
			body: JSON.stringify({
				"url": newVideoUrl,
				"creatorId": "6773552c-b33f-4cc3-a49e-6bdf10291849"
			})
		})
    
		const newVideo:Video = await res.json();
		setVideosQueue([...videosQueue, newVideo].sort((a, b) => b.upvotes - a.upvotes))
		setNewVideoUrl('')

  }

  // const handleShare = (video: typeof videos[0]) => {
  //   const shareUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`
  //   navigator.clipboard.writeText(shareUrl).then(() => {
  //     toast.success('Video link copied to clipboard!', {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     })
  //   }).catch(() => {
  //     toast.error('Failed to copy link. Please try again.', {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     })
  //   })
  // }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
    <Appbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Stream Player</h1>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
						{(currentVideo) &&
							<Card className="bg-white dark:bg-gray-800 mb-6">
								<CardHeader>
									<CardTitle className="text-gray-900 dark:text-white">{currentVideo.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="aspect-video">
										<iframe
											width="100%"
											height="100%"
											src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1`}
											title={currentVideo.title}
											frameBorder="0"
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
											allowFullScreen
										></iframe>
									</div>
									<div className="flex justify-between items-center mt-4">
										<div className="flex items-center space-x-2">
											<Music className="h-4 w-4 text-gray-500 dark:text-gray-400" />
										</div>
										<div className="flex space-x-2">
											{/* <Button onClick={handleNextVideo} className="bg-purple-600 hover:bg-purple-700 text-white">
												Next Video
											</Button> */}
											{/* <Button onClick={() => handleShare(currentVideo)} className="bg-purple-600 hover:bg-purple-700 text-white">
												<Share2 className="h-4 w-4 mr-2" />
												Share
											</Button> */}
										</div>
									</div>
								</CardContent>
							</Card>
						}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Add Next Video</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddVideo} className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Paste YouTube URL here"
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    className="flex-grow"
                  />
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Upcoming Videos</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-300px)]">
                  {videosQueue.map((video, index) => (
                    <div key={video.id} className="mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex space-x-4">
                        <div className="flex-shrink-0">
                          <Image
                            src={`https://img.youtube.com/vi/${video.youtubeId}/default.jpg`}
                            alt={`Thumbnail for ${video.title}`}
                            width={120}
                            height={90}
                            className="rounded-md"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold truncate text-gray-800 dark:text-white">{video.title}</h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">#{index + 1}</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleVote(video)}
                              className="flex items-center space-x-1 border-purple-600 text-purple-600 hover:bg-purple-100 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900"
                            >
                              {video.haveUpvoted? <ThumbsDown className="h-4 w-4" /> : <ThumbsUp className="h-4 w-4" /> }	
                              <span>{video.upvotes}</span>
                            </Button>
                            {/* <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleShare(video)}
                              className="flex items-center space-x-1 border-purple-600 text-purple-600 hover:bg-purple-100 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900"
                            >
                              <Share2 className="h-4 w-4" />
                              <span>Share</span>
                            </Button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}