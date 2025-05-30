import styled from "styled-components";

export const SmallText = styled.span`
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: var(--small-text);
  /* font-weight: bold; */
`;
export const SmallTextTheme = styled.span`
    color: ${({ theme }) => theme.colors.textTheme};
    font-size: var(--small-text);
  /* font-weight: bold; */
`;
export const SmallTextSecondary = styled.span`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: var(--small-text);
  /* font-weight: bold; */
`;

export const SmallTextPrimaryShared = styled.span`
  font-size: var(--small-text);
  color: ${({ theme }) => theme.colors.primaryShared};
`
export const SmallTextShared = styled.span`
  font-size: var(--small-text);
  color: ${({ theme }) => theme.colors.textShared};
`
