import React, { useEffect, useState } from 'react'
import { Card, Box, Button, Typography,CardActions, CardContent, IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Avatar from './avatar';

function PostCard(props){
    const [users, setUsers] = useState([])
    const [showUsers, setShowUsers] = useState(false)

    function reverse(input) {
      var ret = new Array;
      for(var i = input.length-1; i >= 0; i--) {
          ret.push(input[i]);
      }
      return ret;
  }
  

    const handleShowUsers = () => {
      setShowUsers(!showUsers)
    }

    useEffect(() => {
      setUsers(reverse(props.users))
    }, [props.users])

    return (
        <Card onClick={ () => {showUsers && handleShowUsers()}} className="postCard">
        <CardContent>
          <Typography className='text-center' variant="h6" component="div" gutterBottom>
            {props.description}
          </Typography>
          <Typography variant="body2">
           {props.url}
            <br />
          </Typography>
        </CardContent>
        <CardActions className= 'justify-content-between' >
        <Tooltip title="like">
            <IconButton onClick={() => { props.handleLike(props.id) }} aria-label="like" color="secondary">
                <FavoriteIcon/>
            </IconButton>
        </Tooltip>
        <div onClick={() => {handleShowUsers()}} className='users-mini'>
            {users.map((user, key) => {
                if(key < 3){
                  return (
                    <Avatar key={key} title={Array.from(user.user.name)[0]} />
                )
                }
            })}
        </div>
        </CardActions>
        {showUsers ? 
        <div className="users-lists">
            {users.map((user, key) => {
                return (
                  <Typography key={key} variant="p">{user.user.name}</Typography>
                )
            })}
        </div> : <></>}
      </Card>
    )
}
export default PostCard;