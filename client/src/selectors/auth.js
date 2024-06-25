import { createSelector } from '@reduxjs/toolkit';

export const getUserId = createSelector(
    ({ auth }) => auth.tokenData.userId,
    userId => userId ? userId : null
);