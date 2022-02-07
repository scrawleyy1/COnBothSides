import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PostList from "./Post/PostList";
import PostDetails from "./Post/PostDetails";
import PostForm from "./Post/PostForm";
import CategoryList from "./Category/CategoryList";
import { CategoryForm } from "./Category/CategoryForm";
import DeleteCategory from "./Category/DeleteCategory";


export default function ApplicationViews({ isLoggedIn }) {

    return (
        <main>
            <Switch>

                <Route path="/" exact>
                    {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/post/create" exact>
                    {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/post/:id" exact>
                    {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
                </Route>

                <Route path="/post" exact>
                    {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
                </Route>

                <Route path="/Categories" exact>
                    {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/category/create" exact>
                    {isLoggedIn ? <CategoryForm /> : <Redirect to="login" />}
                </Route>

                <Route path="/deleteCategory/:id">
                    <DeleteCategory userparams />
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </main>
    );
};
