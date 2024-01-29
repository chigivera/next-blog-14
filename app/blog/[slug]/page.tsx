import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
export const revalidate = 30;
const getData = async (slug : string) => {
    const query = `*[_type == "blog" && slug.current=="${slug}"] {
        "currentSlug": slug.current,
          title,
          content,
          titleImage,
      }`;
    try {
      const data = await client.fetch(query);
      return data;
    } catch (error) {
      console.error("Error fetching data from Sanity:", error);
      throw error;
    }
  };
  


export default async function  blogArticle ({params}:{params:{slug:string}})  {
    const data : fullBlog[] = await getData(params.slug);
    console.log(data[0])
    return <div className="">
        <h1>
            <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
                Ayman Ben - Blog
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
              {data[0].title}
            </span>
        </h1>
        <Image
        src={urlFor(data[0].titleImage).url()}
        alt="image"
        width={800}
        height={800}
        className="rounded-lg mt-8  object-cover"
      />
      <div className="mt-16 prose prose-blue prose-xl dark:prose-invert prose-headings:underline  prose-li:marker:text-primary prose-a:text-primary">
        <PortableText value={data[0].content} />
      </div>
    
    </div>
}