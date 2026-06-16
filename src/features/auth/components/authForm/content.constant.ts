export const COMPONENT_CONTENT = {
  register: {
    title: "Create your account",
    tagline: "Start generating timetables in seconds.",
    submitBtn: "Create account",
    link: {
      text: "Already have an account?",
      spanText: "Sign In",
      link: "/login",
    },
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    initialErrors: {
      username: undefined,
      email: undefined,
      password: undefined,
      confirmPassword: undefined,
    },
  },
  login: {
    title: "Sign in",
    tagline: "Welcome back. Let's get you in",
    submitBtn: "Sign in",
    link: {
      text: "New to MakeTable?",
      spanText: "Create one",
      link: "/register",
    },
    initialValues: {
      username: "",
      password: "",
    },
    initialErrors: {
      username: undefined,
      password: undefined,
    },
  },
} as const;
