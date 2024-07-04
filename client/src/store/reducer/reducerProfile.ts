export interface UserType{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    image?: string;
    status: boolean;
    role: "ADMIN" | "USER";
}
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface PostState {
    UserType: UserType[];
}

const initialState: PostState = {
    UserType: []
};

// Lấy tất cả dữ liệu
export const getPost:any = createAsyncThunk(
  "UserType/getAllPost",
  async () => {
    const response = await axios.get("http://localhost:8080/posts");
    return response.data;
  }
);

// Thêm dữ liệu
export const addPost:any = createAsyncThunk(
  "posts/addPost",
  async (UserType: UserType) => {
    const response = await axios.post("http://localhost:8080/posts", UserType);
    return response.data;
  }
);

// Xoá dữ liệu
export const deletePost:any = createAsyncThunk(
  "posts/deletePost",
  async (id: number) => {
    await axios.delete(`http://localhost:8080/posts/${id}`);
    return id;
  }
);

const reducerPost = createSlice({
  name: "UserType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPost.fulfilled, (state, action) => {
        state.UserType = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.UserType.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.UserType = state.UserType.filter((item: any) => item.id !== action.payload);
      });
  },
});

export default reducerPost.reducer;