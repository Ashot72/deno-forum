import { useCallback, useState } from "react";
import { groupBy, uniqBy } from "lodash";

import { BASEURL, LIMIT, TOKEN } from "../helpers/constants";
import { IForum, ITopic } from "../Reducers/reducers";
import { IPost } from "../Reducers/postReducer";
import { Actions } from "../helpers/enums";
import { ILike } from "../helpers/interfaces";

const mapForums = (data: any) =>
  Object.entries(groupBy(data, "id"))
    .map(([_, forums]) => {
      const forum = forums[0];
      forum.topics = uniqBy(
        forums.filter((f) => f.topicId != null),
        "topicId",
      ).length;
      forum.posts = uniqBy(
        forums.filter((f) => f.postId != null),
        "postId",
      ).length;
      return forum;
    });

const mapTopics = (data: any) =>
  Object.entries(groupBy(data, "id"))
    .map(([_, topics]) => {
      const topic = topics[0];
      const posts = uniqBy(
        topics.filter((t) => t.postId != null),
        "postId",
      ).length;
      topic.replies = posts ? posts - 1 : 0;
      return topic;
    });

const isNotValidStatus = (data: any) => data.status && data.status >= 400;
const token = () => localStorage.getItem(TOKEN);

export const useService = (dispatch?: any) => {
  const [data, setData] = useState([]) as any;
  const [error, setError] = useState() as any;
  const [loading, setLoading] = useState(false);

  const getForum = useCallback((id: number) => {
    setLoading(true);

    fetch(`${BASEURL}/forum/${id}`)
      .then((res) => res.json())
      .then((forum: IForum) => {
        setData([forum]);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, []);

  const getForums = useCallback(() => {
    setLoading(true);

    fetch(`${BASEURL}/forums`)
      .then((res) => res.json())
      .then((forums) => {
        setData(mapForums(forums));
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, []);

  const addForum = (forum: Partial<IForum>) => {
    fetch(`${BASEURL}/addForum`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token(),
      },
      body: JSON.stringify(forum),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isNotValidStatus(data)) {
          throw data;
        }
        getForums();
      })
      .catch((e) => {
        setError(e);
      });
  };

  const updateForum = (forum: Partial<IForum>) => {
    fetch(`${BASEURL}/updateForum`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token(),
      },
      body: JSON.stringify(forum),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isNotValidStatus(data)) {
          throw data;
        }
      })
      .catch((e) => {
        setError(e);
      });
  };

  const deleteForum = (id: number) => {
    fetch(`${BASEURL}/deleteForum`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token(),
      },
      body: JSON.stringify({ id }),
    })
      .catch((e) => {
        setError(e);
      });
  };

  const getTopic = useCallback((id: number) => {
    setLoading(true);

    fetch(`${BASEURL}/topic/${id}`)
      .then((res) => res.json())
      .then((topic: ITopic) => {
        setData([topic]);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, []);

  const getTopics = useCallback((fid: number) => {
    setLoading(false);

    fetch(`${BASEURL}/topics/${fid}`)
      .then((res) => res.json())
      .then((topics: ITopic[]) => {
        setData(mapTopics(topics));
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, []);

  const addTopic = (topic: Partial<ITopic>) => {
    fetch(`${BASEURL}/addTopic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token(),
      },
      body: JSON.stringify(topic),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isNotValidStatus(data)) {
          throw data;
        }

        const { userId, title, description, forumId } = topic;
        const post: Partial<IPost> = {
          userId,
          title,
          description,
          forumId,
          topicId: data.lastInsertId,
        };
        addPost(post, false);
        getTopics(forumId!);
      })
      .catch((e) => {
        setError(e);
      });
  };

  const updateTopic = (topic: Partial<ITopic>) => {
    fetch(`${BASEURL}/updateTopic`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token(),
      },
      body: JSON.stringify(topic),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isNotValidStatus(data)) {
          throw data;
        }
      })
      .catch((e) => {
        setError(e);
      });
  };

  const updateView = useCallback((topic: Partial<ITopic>) => {
    fetch(`${BASEURL}/updateView`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token(),
      },
      body: JSON.stringify(topic),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isNotValidStatus(data)) {
          throw data;
        }
      })
      .catch((e) => {
        setError(e);
      });
  }, []);

  const deleteTopic = (id: number) => {
    fetch(`${BASEURL}/deleteTopic`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token(),
      },
      body: JSON.stringify({ id }),
    })
      .catch((e) => {
        setError(e);
      });
  };

  const getPosts = useCallback((tid: number, skip: number, limit: number) => {
    setLoading(false);

    fetch(`${BASEURL}/posts/${tid}/${skip}/${limit}`)
      .then((res) => res.json())
      .then((data: { posts: IPost[]; count: number; likes: any }) => {
        setData(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, []);

  const addPost = (post: Partial<IPost>, shouldLoad: boolean = true) => {
    fetch(`${BASEURL}/addPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token(),
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isNotValidStatus(data)) {
          throw data;
        }

        if (shouldLoad) {
          dispatch({ type: "REMOVE_POSTS" });
          getPosts(post.topicId!, 0, LIMIT);
        }
      })
      .catch((e) => {
        setError(e);
      });
  };

  const updatePost = (post: Partial<IPost>) => {
    fetch(`${BASEURL}/updatePost`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token(),
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isNotValidStatus(data)) {
          throw data;
        }
      })
      .catch((e) => {
        setError(e);
      });
  };

  const likePost = (like: ILike) => {
    fetch(`${BASEURL}/addLike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token(),
      },
      body: JSON.stringify(like),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isNotValidStatus(data)) {
          throw data;
        }
        setData([data]);
      })
      .catch((e) => {
        setError(e);
      });
  };

  const deletePost = (id: number) => {
    fetch(`${BASEURL}/deletePost`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token(),
      },
      body: JSON.stringify({ id }),
    })
      .catch((e) => {
        setError(e);
      });
  };

  const login = (email: string, password: string) => {
    setLoading(false);

    fetch(`${BASEURL}/loginUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isNotValidStatus(data)) {
          throw data;
        }
        setData([data.access_token, data.refresh_token]);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  };

  const register = (email: string, password: string, role: Actions) => {
    setLoading(false);

    fetch(`${BASEURL}/registerUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isNotValidStatus(data)) {
          throw data;
        }
        setData([data.affectedRows]);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  };

  return {
    data,
    loading,
    error,
    getForum,
    getForums,
    addForum,
    updateForum,
    deleteForum,
    getTopic,
    getTopics,
    addTopic,
    updateTopic,
    updateView,
    deleteTopic,
    getPosts,
    addPost,
    updatePost,
    likePost,
    deletePost,
    login,
    register,
  };
};
