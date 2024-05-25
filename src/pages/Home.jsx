import React,{useEffect, useState} from 'react'
import appwriteService from "../appwrite/appconfig"
import { useSelector } from 'react-redux'
import {Container, PostCard} from "../components"

function Home() {
    const [posts, setPosts] = useState([])
    const isAuthenticated = useSelector(state => state.auth.status);
    useEffect(()=>{
        if (!isAuthenticated) {
            setPosts([]);
        }else{
            appwriteService.getPosts().then((posts)=>{
                if(posts){
                    setPosts(posts.documents)
                }
            })
        }
    },[isAuthenticated])
    if (!isAuthenticated){
        return (
            <div className=" flex justify-center w-full py-8 text-center">
                <Container>
                    <div className="flex justify-center p-10">
                        <div className="w-full p-5 ">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home