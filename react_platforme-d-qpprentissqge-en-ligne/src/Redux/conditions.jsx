import { disconnect, updateAuth, updateStudent } from "./Slices/StudentAccount";
import { getStudent } from "./StudentApi";

async function conditionLogin(response, status, dispatch) {
  if (response.status == status) {
    dispatch(updateAuth(true));
    await getStudent()
      .then((res) => {
        dispatch(updateStudent(res.data.student));
        setFromStorage('student',JSON.stringify(res.data.student))
        setFromStorage("auth", true);
      })
      .then((error) => {
        console.log(error);
      });
  }
}

async function test(dispatch) {
  dispatch(updateAuth(true));
  await getStudent()
    .then((res) => {
      console.log(res.data.student)
      dispatch(updateStudent(res.data.student));
      setFromStorage('student',JSON.stringify(res.data.student))
      setFromStorage("auth", true);
    })
    .then((error) => {
      dispatch(updateStudent({}));

      console.log(error);
    });
  // navigate("/");
}

function conditionLogout(dispatch, nav) {
  localStorage.clear();
  nav("/accounts/login");
  dispatch(disconnect());
}

function getFromStorage(name, valueReturned) {
  return JSON.parse(localStorage?.getItem(name)) || valueReturned;
}
function setFromStorage(name, value) {
  localStorage.setItem(name, value);
}

export {
  conditionLogin,
  conditionLogout,
  getFromStorage,
  setFromStorage,
  test,
};
