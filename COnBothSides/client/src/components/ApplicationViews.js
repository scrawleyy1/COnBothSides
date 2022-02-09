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
import SocialPlatformList from "./SocialPlatform/SocialPlatformList";
import SocialPlatformForm from "./SocialPlatform/SocialPlatformForm";
import DeleteSocialPlatform from "./SocialPlatform/DeleteSocialPlatform";
import PostUpdateForm from "./Post/UpdatePost";
import SocialPlatformUpdateForm from "./SocialPlatform/UpdateSocialPlatform";
import CategoryUpdateForm from "./Category/UpdateCategory";



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

                <Route path="/post/:id/edit" exact>
                    {isLoggedIn ? <PostUpdateForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/Categories" exact>
                    {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/category/create" exact>
                    {isLoggedIn ? <CategoryForm /> : <Redirect to="login" />}
                </Route>

                <Route path="/Categories/:id/edit" exact>
                    {isLoggedIn ? <CategoryUpdateForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/deleteCategory/:id">
                    <DeleteCategory userparams />
                </Route>

                <Route path="/socialPlatform" exact>
                    {isLoggedIn ? <SocialPlatformList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/socialPlatform/create" exact>
                    {isLoggedIn ? <SocialPlatformForm /> : <Redirect to="login" />}
                </Route>

                <Route path="/socialPlatform/:id/edit" exact>
                    {isLoggedIn ? <SocialPlatformUpdateForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/deleteSocialPlatform/:id">
                    <DeleteSocialPlatform userparams />
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
