import styled from 'styled-components';

interface ISvg {
  padding?: string;
  dark?: boolean;
}

export const PathPrimary = styled.path`
  fill: ${(props) => props.theme.colors.accent};
`;

export const CirclePrimary = styled.circle`
  fill: ${(props) => props.theme.colors.accent};
`;

export const PolygonPrimary = styled.polygon`
  fill: ${(props) => props.theme.colors.accent};
`;

export const CircleSecondary = styled.circle`
  fill: ${(props) => props.theme.colors.darkSecondary};
`;

export const PathSecondary = styled.path`
  fill: ${(props) => props.theme.colors.darkSecondary};
`;

export const StyledSVG = styled.svg.attrs<ISvg>({
  xmlns: 'http://www.w3.org/2000/svg',
})<ISvg>`
  padding: ${(props) => props.padding || '0'};
  fill: inherit;
  width: 100%;
  height: 100%;
  filter: drop-shadow(
    0 0 0.035rem ${(props) => props.theme.colors.darkPrimary}
  );
`;
