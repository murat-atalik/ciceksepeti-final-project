import { combineReducers } from 'redux';

import AcceptOfferReducer from './account/acceptOffer';
import CancelOfferReducer from './account/cancelOffer';
import GivenOffersReducer from './account/givenOffers';
import ReceivedOffersReducer from './account/receivedOffers';
import RejectOfferReducer from './account/rejectOffer';
import SigninReducer from './authorization/signin';
import SignupReducer from './authorization/signup';
import AllBrandsReducer from './brand/allBrands';
import AllCategoriesReducer from './category/allCategories';
import AllColorsReducer from './color/allColors';
import UploadIamgeReducer from './file/uploadImage';
import AllProductReducer from './product/allProducts';
import CreateProductReducer from './product/createProduct';
import GetProductReducer from './product/getProduct';
import OfferProductReducer from './product/offerProduct';
import PurchaseProductReducer from './product/purchaseProduct';
import AllStatusReducer from './status/allStatus';

export default combineReducers({
  signin: SigninReducer,
  signup: SignupReducer,
  allCategories: AllCategoriesReducer,
  allBrands: AllBrandsReducer,
  allColors: AllColorsReducer,
  allStatus: AllStatusReducer,
  getProduct: GetProductReducer,
  allProducts: AllProductReducer,
  createProduct: CreateProductReducer,
  offerProduct: OfferProductReducer,
  purchaseProduct: PurchaseProductReducer,
  uploadIamge: UploadIamgeReducer,
  acceptOffer: AcceptOfferReducer,
  cancelOffer: CancelOfferReducer,
  givenOffers: GivenOffersReducer,
  receivedOffers: ReceivedOffersReducer,
  rejectOffer: RejectOfferReducer,
});
