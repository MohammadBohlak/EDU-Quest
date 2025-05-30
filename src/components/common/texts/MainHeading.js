import styled from "styled-components";

export const MainHeading = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: var(--big-text);
  font-weight: 500;
`;
export const MainHeadingSecondary = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: var(--big-text);
  font-weight: 500;
`
export const MainHeadingPrimaryShared = styled.span`
  color: ${({ theme }) => theme.colors.primaryShared};
  font-size: var(--big-text);
`;
