import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const SidebarMenu = styled.div`
  position: fixed;
  top: 0;
  right: ${({ $isMenuOpen }) => ($isMenuOpen ? "0" : "-100%")};
  bottom: 0;
  width: 100%;
  max-width: 100%;
  background-color: rgba(25, 25, 25, 0.99);
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
  z-index: 1002;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  overflow-y: auto;
  transition: right 0.3s ease-in-out;
`;

const SidebarItem = styled.a`
  display: block;
  padding: 1rem 0;
  color: white;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: gray;
  font-size: 1.3rem;
  cursor: pointer;
  position: absolute;
  top: 1.1rem;
  right: 1.5rem;
  z-index: 1003;

  &:hover {
    color: #fff;
  }
`;

const Sidebar = ({ isMenuOpen, closeMenu }) => (
  <SidebarMenu $isMenuOpen={isMenuOpen}>
    <CloseButton onClick={closeMenu}>
      <FontAwesomeIcon icon={faTimes} />
    </CloseButton>
    <SidebarItem href="/login">로그인</SidebarItem>
    <SidebarItem href="/signup">회원가입</SidebarItem>
  </SidebarMenu>
);

export default Sidebar;
