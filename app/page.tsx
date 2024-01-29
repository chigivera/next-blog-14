import Navbar from "./components/Navbar"
import { simpleBlogCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity"
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 30;


const getData = async () => {
  const query = `*[_type == "blog"] | order(_createdAt desc){
    title,
    smallDescription,
    "currentSlug": slug.current,
    titleImage
  }`;
  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    throw error;
  }
};




export default  async function Home() {

    const data : simpleBlogCard[] = await getData();
 
  return (
   <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-5">
      
    {data.map((post,idx)=> (
     <Card key={idx}>
      <Image
        src={urlFor(post.titleImage).url()}
        alt="image"
        width={500}
        height={500}
        className="rounded-t-lg h-[200px] object-cover"
      />
     <CardHeader>
       <CardTitle className="line-clamp-2">{post.title}</CardTitle>
       <CardDescription className="line-clamp-3 text-sm mt-2 text-gray">{post.smallDescription}</CardDescription>
     </CardHeader>
   
     <CardFooter>
      <Button asChild className="w-full mt-7">
        <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
      </Button>

     </CardFooter>
   </Card>
   
    ))}
   </div>
  )
}
