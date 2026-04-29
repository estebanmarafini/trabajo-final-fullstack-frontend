import React from 'react'
import { Route, Routes } from 'react-router'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import ResetPasswordRequestScreen from './Screens/ResetPasswordRequestScreen/ResetPasswordRequestScreen'
import AuthMiddleware from './Middlewares/AuthMiddleware'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import NewWorkspaceScreen from './Screens/NewWorkspaceScreen/NewWorkspaceScreen'
import WorkspaceScreen from './Screens/WorkspaceScreen/WorkspaceScreen'
import ChannelScreen from './Screens/ChannelScreen/ChannelScreen'
import UploadProfileFilesScreen from './Screens/UploadProfileFilesScreen/UploadProfileFilesScreen'



const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/' element={<LoginScreen />} />
      <Route 
        path="/reset-password-request" 
        element={<ResetPasswordRequestScreen/>}
      />
      <Route element={<AuthMiddleware/>}>
        <Route 
          path='/home' 
          element={<HomeScreen/>}
        />
        <Route 
          path='/user/files'
          element={<UploadProfileFilesScreen/>}
        />
         <Route path="/workspace/new" element={<NewWorkspaceScreen />} />
         <Route path="/workspace/:workspace_id" element={<WorkspaceScreen />} />
         <Route path="/workspace/:workspace_id/:channel_id" element={<ChannelScreen />} />
      </Route>

    </Routes>
  )
}

export default App