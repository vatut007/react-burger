import { User } from "../../../types/user";
import { addAccessToken, addRefreshToken, addUser, clearUser } from "./actions";
import { userSlice } from "./slice";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

const { reducer, getInitialState } = userSlice;

const getUser = (): User => ({
  email: "test@test.ru",
  name: "Test",
});

const getStateUserAdd = () => reducer(getInitialState(), addUser(getUser()))

test("add user", () => {
  expect(reducer(getInitialState(), addUser(getUser()))).toMatchSnapshot();
});

test("add Access Token",
  () => {
    expect(
      reducer(getInitialState(), addAccessToken({ accessToken: "bearer" })),
    ).toMatchSnapshot();
  });

test("add Refresh Token",
  () => {
    expect(
      reducer(getInitialState(), addRefreshToken({ refreshToken: 'refresh'})),
    ).toMatchSnapshot();
  });

test("clear User", ()=>{
    expect(
        reducer(getStateUserAdd(), clearUser())
    ).toMatchSnapshot()
})
