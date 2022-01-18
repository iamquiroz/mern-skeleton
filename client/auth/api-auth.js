const signin = async (user) => {
  try {
    let response = await fetch("/auth/signin/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    return await response.JSON();
  } catch (err) {
    console.log(err);
  }
};

const signout = async () => {
  try {
    let response = await fetch("/auth/signout", { method: "GET" });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { signin, signout };
