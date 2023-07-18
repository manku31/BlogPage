import { useState, useRef, useEffect, useReducer } from "react";
import { db } from "../firebaseInit";
import { collection, addDoc } from "firebase/firestore";

function blogsReducer(state, action) {
  // state have the current value and action have updatede thing
  switch (action.type) {
    case "ADD":
      return [action.blog, ...state];
    case "REMOVE":
      return state.filter((blog, index) => index !== action.index);

    default:
      return [];
  }
}

export default function Blog() {
  const [formData, setFormData] = useState({ title: "", content: "" }); // for storing data
  // const [blogs, setBlogs] = useState([]);
  const [blogs, dispatch] = useReducer(blogsReducer, []); // reuce the action option like add or remove
  const titleRef = useRef(null); // for Focusing on input curcer

  async function handleSubmit(e) {
    e.preventDefault();
    titleRef.current.focus();

    dispatch({
      type: "ADD",
      blog: { title: formData.title, content: formData.content },
    });

    // Add a new document with a generated id in FireBase.
    // const docRef = await addDoc(collection(db, "blogs"), {...}   //This is also a way to add
    await addDoc(collection(db, "blogs"), {
      title: formData.title,
      content: formData.content,
      createdOn: new Date(),
    });

    // setBlogs([{ title: formData.title, content: formData.content }, ...blogs]);
    setFormData({ title: "", content: "" });
  }

  function removeBlog(i) {
    dispatch({ type: "REMOVE", index: i });
    // setBlogs(blogs.filter((blog, index) => i !== index));
  }

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  useEffect(() => {
    if (blogs.length && blogs[0].title) {
      document.title = blogs[0].title;
    } else {
      document.title = "No Blog!!!";
    }
  });

  return (
    <>
      <h1>Write a Blog!</h1>
      <div className="section">
        <form onSubmit={handleSubmit}>
          <Row label="Title">
            <input
              className="input"
              placeholder="Enter the Title of the Blog here.."
              value={formData.title}
              ref={titleRef}
              onChange={(e) =>
                setFormData({
                  title: e.target.value,
                  content: formData.content,
                })
              }
            />
          </Row>

          <Row label="Content">
            <textarea
              className="input content"
              placeholder="Content of the Blog goes here.."
              required
              value={formData.content}
              onChange={(e) =>
                setFormData({ title: formData.title, content: e.target.value })
              }
            />
          </Row>
          <button className="btn">ADD</button>
        </form>
      </div>

      <hr />

      <h2> Blogs </h2>
      {blogs.map((blog, i) => (
        <div className="blog" key={i}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>

          <div className="blog-btn">
            <button onClick={() => removeBlog(i)} className="btn remove">
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

//Row component to introduce a new row section in the form
function Row(props) {
  const { label } = props;
  return (
    <>
      <label>
        {label}
        <br />
      </label>
      {props.children}
      <hr />
    </>
  );
}
