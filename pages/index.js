import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import PostCard from '../components/card';
import Navbar from '../components/navbar';
import ModalForm from "../components/modalform";
import { useEffect, useState } from "react"
import { gql, useQuery, useMutation } from '@apollo/client'
import Apolloclient from '../handlers/apollo-client';
import LOGIN_MUTATION from '../handlers/login-mutation';
import SIGNUP_MUTATION from '../handlers/signup-mutation';
import { Snackbar, Alert } from '@mui/material';
import LIKE_MUTATION from '../handlers/like-mutation';
import LINKSQUERY from '../handlers/link-query';

export default function Home({ posts }) {

  const [modalType, setModalType] = useState(0)
  const [len, setLen] = useState(20)
  const [content, setContent] = useState([])
  const [search, setSearch] = useState("")
  const [exception, setException] = useState("")

  const [searching, setSearching] = useState(false)
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(true) 

  let token = null

  ///MUTATIONS
  const [loginMutation, { data, error, load}] = useMutation(LOGIN_MUTATION);
  const [signupMutation, { d, e, l }] = useMutation(SIGNUP_MUTATION)
  const [likeMutation, { dat, err, loadd}] = useMutation(LIKE_MUTATION, {context: {
                                                                            headers: {
                                                                            "Authorization": `Bearer ${token}`
                                                                        }
                                                                    }})

  const handleModal = (type) => {
    if(type != 0){
      setModal(true)
      setModalType(type)
    } else {
      setModal(0)
    }
  }
  const handleException = () => {
    setException('')
  }
  const handleLike = async (id) => {
    try{
      var data = await likeMutation({ variables : { id : id } })
      if(data){
        console.log(data)
      }
    } catch(error){
      console.log(error)
    }
  }
  ///Login and Registrations
  const handleAuthentication = async (name, email, password) => {
     var data = null
      if(modalType == 1){
        try {
          data  = await loginMutation({ variables: { email: email, password : password } })
          if(data){
            localStorage.setItem("token", data.data.login.token)
            setModal(false)
          }
        } catch(error) {
          setException(error.message)
        }
      } else {
        try{
          data = await signupMutation({ variables : { name: name, email : email, password : password } })
          if(data){
            localStorage.setItem("token", data.data.signup.token)
            setModal(false)
          }
        } catch(error){
          setException(error.message)
        }
      }
  }
  
  ///Searching system 
  const handleSearch = async () => {
    setLoading(true)
    const searchQuery = gql`
    query {
      feed(filter: "${search}") {
        count
        links {
          id
          description
          url
          postedBy {
            id
            name
          }
          votes {
            id
            user {
              id
              name
            }
          }
        }
      }
    }
    `
    const { data } = await Apolloclient.query({
      query: searchQuery,
    });
    if(data && search.length > 0) { 
      setContent(data.feed.links)
    }
    if(search.length == 0){
      const { data } = await Apolloclient.query({
        query: LINKSQUERY,
      });
      setContent(data.feed.links)
    }
    setSearching(false)
    setLoading(false)
  }

  ///UseEffects
  useEffect(() => {
    if(search.length > 0 && !searching){
      setSearching(true)
      setTimeout(handleSearch, 1000)
    }
  }, [search])
  
  useEffect(() => {
    setContent(posts)
    token = localStorage.getItem("token")
    console.log(token)
  },[posts])

  useEffect(() => {
    if(content.length > 1){
      setLoading(false)
    }
  },[content])
  

  return (
    <div className={styles.background} >
      <Navbar search={search} onSearch={setSearch} handleModal={handleModal}/>
      {!loading ? <div className='container p-2 app' >
        {content.map((post, key) => {
          return (
            <PostCard handleLike={handleLike} key={key} id={post.id} description={post.description} url={post.url} users={post.votes}/>
          )
        })}
      
      </div> :
      <div className='loading container text-center'>Loading....</div> 
      } 
      {modal ? 
             <ModalForm handleAuthentication={handleAuthentication} handleModal={handleModal} type={modalType} /> :
             <></>
      }
      {exception.length > 0 && 
          <Snackbar open={true} autoHideDuration={4000} onClose={handleException}>
             <Alert severity="error" sx={{ width: '100%' }}>
               {exception}
             </Alert>
          </Snackbar>
      }
    </div>
  )
}

export async function getStaticProps() {
  const { data } = await Apolloclient.query({
    query: LINKSQUERY,
  });

  return {
    props: {
      posts: data.feed.links,
    },
 };
}
