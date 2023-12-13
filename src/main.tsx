import ReactDOM from 'react-dom/client'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { store } from './redux/store.ts'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId="355425585800-eis90bs2nefmj2itb4cbku0bt1um2ncl.apps.googleusercontent.com">
        <Provider store={store}>
            <App />
            {/* <RouterProvider router={router} /> */}
        </Provider>
    </GoogleOAuthProvider>,
)
