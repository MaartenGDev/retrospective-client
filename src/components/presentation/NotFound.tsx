import React, {FC} from "react";
import {Container, Content} from "../styles/Common";
import {Link} from "react-router-dom";

interface IProps {
    message: string
}

export const NotFound: FC<IProps> = ({message}) => {
    return (
        <Container>
            <h3>Something went wrong</h3>
            <Content>
                <p>{message}</p>
                <p>Check your <Link to='/teams'>teams</Link> and <Link to='/account'>account</Link>.</p>
            </Content>
        </Container>
    )
}