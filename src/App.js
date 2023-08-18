import { Route, Routes } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import UnkownRoute from './routes/404/un-known-route.component';
import UserDash from './routes/user-dash/user-dash.component';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='dashboard/*' element={<UserDash />} />
        <Route path='*' element={<UnkownRoute />} />
      </Route>
    </Routes>

  );
}

export default App;
