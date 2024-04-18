import { lazy } from 'react';
import ProductList from '../pages/Product/ProductList';
import ProductImage from '../pages/Product/ProductImage';
const Index = lazy(() => import('../pages/Index')); 
const Todolist = lazy(() => import('../pages/Apps/Todolist')); 
const Contacts = lazy(() => import('../pages/Apps/Contacts'));  
const List = lazy(() => import('../pages/Apps/Invoice/List'));
const Preview = lazy(() => import('../pages/Apps/Invoice/Preview'));
const Add = lazy(() => import('../pages/Apps/Invoice/Add'));
const Edit = lazy(() => import('../pages/Apps/Invoice/Edit'));  
const DragAndDrop = lazy(() => import('../pages/DragAndDrop')); 
const LoginBoxed = lazy(() => import('../pages/Authentication/LoginBoxed'));
const RegisterBoxed = lazy(() => import('../pages/Authentication/RegisterBoxed'));
const UnlockBoxed = lazy(() => import('../pages/Authentication/UnlockBox'));
const RecoverIdBoxed = lazy(() => import('../pages/Authentication/RecoverIdBox'));
const LoginCover = lazy(() => import('../pages/Authentication/LoginCover'));
const RegisterCover = lazy(() => import('../pages/Authentication/RegisterCover'));
const RecoverIdCover = lazy(() => import('../pages/Authentication/RecoverIdCover'));
const UnlockCover = lazy(() => import('../pages/Authentication/UnlockCover'));
const About = lazy(() => import('../pages/About'));
const Error = lazy(() => import('../components/Error'));  

const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />,
    },
    {
        path: '/apps/todolist',
        element: <Todolist />,
    }, 
    {
        path: '/apps/contacts',
        element: <Contacts />,
    }, 
    {
        path: '/product/list',
        element: <ProductList />,
    },
    {
        path: '/product/images',
        element: <ProductImage />,
    },  
    {
        path: '/apps/invoice/list',
        element: <List />,
    },
    // Apps page  
    // preview page
    {
        path: '/apps/invoice/preview',
        element: <Preview />,
    },
    {
        path: '/apps/invoice/add',
        element: <Add />,
    },
    {
        path: '/apps/invoice/edit',
        element: <Edit />,
    },
      
    //  Drag And Drop page
    {
        path: '/dragndrop',
        element: <DragAndDrop />,
    }, 
    //Authentication
    {
        path: '/auth',
        element: <LoginBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/boxed-signup',
        element: <RegisterBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/boxed-lockscreen',
        element: <UnlockBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/boxed-password-reset',
        element: <RecoverIdBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/cover-login',
        element: <LoginCover />,
        layout: 'blank',
    },
    {
        path: '/auth/cover-register',
        element: <RegisterCover />,
        layout: 'blank',
    },
    {
        path: '/auth/cover-lockscreen',
        element: <UnlockCover />,
        layout: 'blank',
    },
    {
        path: '/auth/cover-password-reset',
        element: <RecoverIdCover />,
        layout: 'blank',
    },
     
    {
        path: '/about',
        element: <About />,
        layout: 'blank',
    },
    {
        path: '*',
        element: <Error />,
        layout: 'blank',
    },
];

export { routes };
