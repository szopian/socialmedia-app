import React from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { useForm } from "../util/hooks";
// import { FETCH_POSTS_QUERY } from "../util/graphql";

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost /*, eslint-disable-next-line { error }*/] = useMutation(
    CREATE_POST_MUTATION,
    {
      variables: values,
      update(_, result) {
        console.log(result);
        values.body = "";
      },
    }
  );

  function createPostCallback() {
    createPost();
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Create a post:</h2>
      <Form.Field>
        <Form.Input
          placeholder="SMAR"
          name="body"
          onChange={onChange}
          value={values.body}
        />
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form.Field>
    </form>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
