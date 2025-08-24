// import { Routes, Route } from 'react-router-dom';

// import { AuthProvider } from './contexts/authContext';

// import Header from './components/header/Header';
// import Footer from './components/footer/Footer';
// import Home from './components/home/Home';
// import CourseList from './components/courses/course-list/CourseList';
// import Register from './components/register/Register';
// import Login from './components/login/Login';
// import Logout from './components/logout/Logout';
// import CourseDetails from './components/courses/course-details/CourseDetails';
// import NotFound from './components/not-found/NotFound';
// import AuthGuard from './components/guards/AuthGuard';
// import GuestGuard from './components/guards/GuestGuard';
// import CourseEdit from './components/courses/course-edit/CourseEdit';
// import Profile from './components/profile/Profile';
// import ProfileEdit from "./components/profile/profile-edit/ProfileEdit"
// import CourseCreate from './components/courses/course-create/CourseCreate';
// import CommentList from './components/comments/comment-list/CommentList';
// import TopicList from './components/topics/topic-list/TopicList';
// import MyCourses from './components/courses/my-courses/MyCourses';
// import ParticipantList from './components/participants/ParticipantList';

function App() {

  return (
    <>
      <h1>EPlatform</h1>

        {/* <AuthProvider>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/:courseId" element={<CourseDetails />} />
            <Route path="*" element={<NotFound />} />

            <Route element={<GuestGuard />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<AuthGuard />}>
              <Route path="/courses/create" element={<CourseCreate />} /> 
              <Route path="/courses/:courseId/edit" element={<CourseEdit />} /> 
              <Route path="/courses/:courseId/comments" element={<CommentList />} />
              <Route path="/courses/:courseId/topics" element={<TopicList />} />
              <Route path="/courses/:courseId/participants" element={<ParticipantList />} />
              <Route path="/courses/my-courses" element={<MyCourses />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<ProfileEdit />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
          </Routes>

          <Footer />
        </AuthProvider> */}
    </>
  )
}

export default App
