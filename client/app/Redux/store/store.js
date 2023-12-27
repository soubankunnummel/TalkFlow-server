"use client";

import { configureStore } from '@reduxjs/toolkit';

import postsSlice from './posts/postsSlice';

export const store = configureStore({
    reducer : {
        Post: postsSlice,
    }
}) 