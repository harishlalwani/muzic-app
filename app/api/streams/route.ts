import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";

//@ts-ignore
import youtubesearchapi from "youtube-search-api";

const YT_REGEX = new RegExp(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([a-zA-Z0-9_-]{11})$/gm);


const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string() // youtube or  spotify
}) 

export async function POST(req: NextRequest ) {
    try {
        const data = CreateStreamSchema.parse(await req.json());
        const isYt = YT_REGEX.test(data.url);
        

        if(!isYt) {
            return NextResponse.json({
                message: "Wrong url format"
            }, {
                status: 411
            })
        }

        const session = await getServerSession();
    
        const user = await prismaClient.user.findFirst({
            where: {
                email: session?.user?.email ?? ""
            }
        }) 

        if(!user)  {
            return NextResponse.json({
                message: "Unauthenticated"
            }, {
                status: 403
            })
        }

        const extractedId = data.url.split("?v=")[1];

        const res = await youtubesearchapi.GetVideoDetails(extractedId);

        const thumbnails = res.thumbnail.thumbnails;
        thumbnails.sort((a: {width:number},b:{width:number}) =>  b.width - a.width);
        const stream = await prismaClient.stream.create({
            data: {
                userId: user.id,
                title: res.title ?? "Cant find video",
                bigImg: thumbnails[0].url?? "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg" ,
                smallImg: (thumbnails.length > 1 ? thumbnails[1].url: thumbnails[0].url ) ?? "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
                url: data.url,
                extractedId,
                type: "Youtube"
            }
        })

        return NextResponse.json({
            ...stream,
            haveUpvoted: false,
            upvotes: 0,
            active: false
        }, {
            status: 201
        })
    }
    catch(e) {
        console.log("er", e)
        return NextResponse.json({
            message: "Error while adding stream"
        }, {
            status: 411
        })
    }
    

}

export async function GET(req: NextRequest) {
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    const streams =  await prismaClient.stream.findMany({
        where: {
            userId:  creatorId?? ""
        }
    })

    return NextResponse.json({
        streams
    })
}