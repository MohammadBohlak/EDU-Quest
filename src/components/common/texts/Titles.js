import styled from "styled-components";

export const SecondaryTitle = styled.span`
    color: ${({theme}) => theme.colors.textShared};
    font-size: var(--big-text);
    font-weight: 500; 
`
export const PrimaryTitle = styled.span`
    color: ${({theme}) => theme.colors.primaryShared};
    font-size: var(--big-text);
    font-weight: 500; 
`