import styled from "styled-components";

export const NormalText = styled.span`
  font-size: var(--normal-text);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
export const NormalTextSecondary = styled.span`
  font-size: var(--normal-text);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const NormalTextPrimaryShared = styled.span`
  font-size: var(--normal-text);
  color: ${({ theme }) => theme.colors.primaryShared};
`
export const NormalTextShared = styled.span`
  font-size: var(--normal-text);
  color: ${({ theme }) => theme.colors.textShared};
`