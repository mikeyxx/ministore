import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FiIcons from "react-icons/fi";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { chooseCurrency } from "../features/products/productSlice";
import { filterBySearch } from "../features/products/productFilterSlice";
import Ratings from "./Ratings";
import {
  NavbarContainer,
  NavbarItemWrapper,
  Left,
  Center,
  Right,
  Input,
  CartElement,
  CartIconWrap,
  CartItemCountContainer,
  CartItemCount,
  CartDropdownContainer,
  CartDropdownItem,
  CartDropdownItemImage,
  CartDropdownDetail,
  CartDropdownName,
  CartDropdownButton,
  Currency,
  Select,
  Option,
  HamburgerBtn,
  SearchInputContainer,
  FilterTitle,
  AscendingFilter,
  FilterInputLabel,
  FilterInput,
  DescendingFilter,
  StockFilter,
  FastDeliveryFilter,
  ClearFilterButton,
  RatingFilter,
  ResponsiveFilter,
} from "../components/styles";

import {
  filterByStock,
  filterByDeliveryTimeline,
  sortByPrice,
  filterByRating,
  clearFilters,
} from "../features/products/productFilterSlice";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [click, setClick] = useState(false);
  const cart = useSelector((state) => state.products.cart);
  const currency = useSelector((state) => state.products.currency);
  const dispatch = useDispatch();
  const logger = (event) => {
    dispatch(chooseCurrency(event.target.value));
  };
  const handleClick = () => setClick(!click);
  const { byStock, byFastDelivery, sort, byRating } = useSelector(
    (state) => state.productFilters
  );

  const currencySymbols = currency.map((c, index) => (
    <Option key={index}>{c.symbol}</Option>
  ));

  return (
    <NavbarContainer>
      <NavbarItemWrapper>
        <Left>
          <HamburgerBtn onClick={handleClick} clicked={click}>
            <span />
          </HamburgerBtn>
          <Link to="/">Shopping Cart</Link>
        </Left>
        <Center>
          <Input
            type="search"
            placeholder="Search product"
            onChange={(event) => dispatch(filterBySearch(event.target.value))}
          />
        </Center>
        <Right>
          <Currency>
            <Select onChange={(event) => logger(event)}>
              {currencySymbols}
            </Select>
          </Currency>
          <CartElement onClick={() => setIsOpen(!isOpen)}>
            <CartIconWrap>
              <FiIcons.FiShoppingCart />
            </CartIconWrap>
            <CartItemCountContainer>
              <CartItemCount>{cart.length}</CartItemCount>
            </CartItemCountContainer>
            <MdIcons.MdOutlineKeyboardArrowDown style={{ marginLeft: "5px" }} />
            {isOpen && (
              <CartDropdownContainer>
                {cart.length > 0 ? (
                  <>
                    {cart.map((item) => (
                      <CartDropdownItem key={item.id}>
                        <CartDropdownItemImage src={item.img} alt={item.name} />
                        <CartDropdownDetail>
                          <CartDropdownName>{item.name}</CartDropdownName>
                          <CartDropdownName>?? {item.price}</CartDropdownName>
                        </CartDropdownDetail>
                        <AiIcons.AiFillDelete
                          style={{ fontSize: "17px", cursor: "pointer" }}
                          onClick={() => dispatch()}
                        />
                      </CartDropdownItem>
                    ))}
                    <Link to="/cart">
                      <CartDropdownButton>Go To Cart</CartDropdownButton>
                    </Link>
                  </>
                ) : (
                  <CartDropdownItem>Cart is empty!</CartDropdownItem>
                )}
              </CartDropdownContainer>
            )}
          </CartElement>
        </Right>
        <ResponsiveFilter clicked={click}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "1.5em 0",
            }}
          >
            <FilterTitle>Filter Products</FilterTitle>
            <AscendingFilter>
              <FilterInputLabel htmlFor="ascending">
                <FilterInput
                  type="radio"
                  name="group1"
                  id="ascending"
                  onChange={() => dispatch(sortByPrice("lowToHigh"))}
                  checked={sort === "lowToHigh" ? true : false}
                />
                Ascending
              </FilterInputLabel>
            </AscendingFilter>
            <DescendingFilter>
              <FilterInputLabel htmlFor="descending">
                <FilterInput
                  type="radio"
                  name="group1"
                  id="descending"
                  onChange={() => dispatch(sortByPrice("highToLow"))}
                  checked={sort === "highToLow" ? true : false}
                />
                Descending
              </FilterInputLabel>
            </DescendingFilter>
            <StockFilter>
              <FilterInputLabel htmlFor="inStock">
                <FilterInput
                  type="checkbox"
                  id="inStock"
                  name="group1"
                  onChange={() => dispatch(filterByStock())}
                  checked={byStock}
                />
                Include Out of Stock
              </FilterInputLabel>
            </StockFilter>
            <FastDeliveryFilter>
              <FilterInputLabel htmlFor="fastDeliveyStat">
                <FilterInput
                  type="checkbox"
                  id="fastDeliveyStat"
                  name="group1"
                  onChange={() => dispatch(filterByDeliveryTimeline())}
                  checked={byFastDelivery}
                />
                Fast Delivery Only
              </FilterInputLabel>
            </FastDeliveryFilter>
            <RatingFilter>
              <FilterInputLabel>Rating:</FilterInputLabel>
              <Ratings
                rating={byRating}
                onClick={(i) => dispatch(filterByRating(i + 1))}
              />
            </RatingFilter>

            <ClearFilterButton onClick={() => dispatch(clearFilters())}>
              Clear Filters
            </ClearFilterButton>
          </div>
        </ResponsiveFilter>
      </NavbarItemWrapper>
      <SearchInputContainer>
        <Input
          type="search"
          placeholder="Search product"
          onChange={(event) => dispatch(filterBySearch(event.target.value))}
        />
      </SearchInputContainer>
    </NavbarContainer>
  );
}

export default Navbar;
