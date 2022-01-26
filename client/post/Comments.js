import React, { useState } from "react";
import auth from "./../auth/auth-helper";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { comment, uncomment } from "./api-post";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  smallAvatar: {
    width: 25,
    height: 25,
  },
  commentField: {
    width: "96%",
  },
  commentText: {
    backgroundColor: "white",
    padding: theme.spacing(1),
    margin: `2px ${theme.spacing(2)}px 2px 2px`,
  },
  commentDate: {
    display: "block",
    color: "gray",
    fontSize: "0.8em",
  },
  commentDelete: {
    fontSize: "1.6em",
    verticalAlign: "middle",
    cursor: "pointer",
  },
}));
export default function Comments(props) {
  const classes = useStyles();
  const [text, setText] = useState("");
  const jwt = auth.isAuthenticated();
  const handleChange = (event) => {
    setText(event.target.value);
  };
  const addComment = (event) => {
    if (event.keyCode == 13 && event.target.value) {
      event.preventDefault();
      comment(
        {
          userId: jwt.user._id,
        },
        {
          t: jwt.token,
        },
        props.postId,
        { text: text }
      ).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setText("");
          props.updateComments(data.comments);
        }
      });
    }
  };

  const deleteComment = comment => event{
	  uncomment({
		  userId: jwt.user._id
	  }, {
		 t: jwt.token 
	  }, props.postId, comment).then((data)=>{
		  if(data.error){
			  console.log(data.error)
		  }else{
			  props.updateComments(data.coments)
		  }
	  })
  }
}
