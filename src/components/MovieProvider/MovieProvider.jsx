import React from "react";
import styled from "styled-components";

const ProviderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem 0;
`;

const ProviderLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 5px;
`;

const ProviderName = styled.span`
  font-size: 1rem;
  color: #fff;
`;

export default function MovieProvider(props) {
  return (
    <ProviderContainer>
      <ProviderLogo
        className="rounded-full w-10"
        src={`https://image.tmdb.org/t/p/w200/${props.movieProvider.logo_path}`}
      />
      <ProviderName>
        {props.movieProvider.provider_name.split(" ").slice(0, 1).join(" ")}
      </ProviderName>
    </ProviderContainer>
  );
}
