import React, {Component} from 'react';

import {Container, Row, Col, Button, Card, CardBody, CardHeader, CardImg, CardTitle, CardText} from 'reactstrap';

import {CLIENT_TEAM_NAME} from "../../utils/constants";

import RyliePicture from "../../static/images/RyliePic.jpg";
import DarinPicture from "../../static/images/Darin.png";
import MikPicture from "../../static/images/MikPic.jpg";
import EdgarPicture from "../../static/images/edgar-pic.png";

const DarinBio = "Darin is a third year student at Colorado State University, where he is studying computer science with" +
    " a minor in math. He was born and raised in Fort Collins, Colorado, so he knows the area well. Programming is one" +
    " of his favorite things to do, and he spends a great deal of time learning new tools and writing games and" +
    " applications in his free time. When he’s not programming, he enjoys listening to music, reading, playing Nintendo" +
    " games, and watching Colorado sports teams on TV. He generally considers himself a hard worker who likes to get" +
    " assignments done right and on time. He is more of a listener than a speaker, and he is always looking for ways" +
    " to help others. He has a brown Shorkie dog named Lily and one brother who is a CSU alumni currently seeking a" +
    " Masters in CS at Georgia Tech. A goal for his future is to travel and explore the world, since he hasn’t been" +
    " more than a few states away from home.";

const EdgarBio = "Edgar is a senior student at Colorado State University, majoring in Computer Science. Edgar is a first" +
    " generation university student, with his parents coming to the United States from Chihuahua, Mexico. He is currently" +
    " focused on his finishing out his senior year and gaining the skills needed to embark on a career in Software Development." +
    " When he is not studying, he is out running the trails of Fort Collins, hiking the mountains here in Colorado, or" +
    " developing his yoga practice."

const RylieBio = "Rylie is a fifth year Computer Science student at Colorado State University. She has lived in Colorado" +
    " for the last six years and loves to hike in the summer and ski in the winter. She is interested in cybersecurity" +
    " and currently has a full-time position as an Information Systems Security Engineer in Colorado Springs. Along with" +
    " learning cybersecurity tools, she enjoys watching movies and shows with friends, listening to music, and baking." +
    " Her twin sister graduated from CSU last spring with a BS in Conservation Biology and her older brother is currently" +
    " earning his EMT certification. Rylie enjoys helping and learning with others and works well in a team environment. A" +
    " goal that she has is to do penetration testing work sometime in the near future.";

const MikBio = "Mikayla is a fourth year student at Colorado State University with a major in Applied Computing Technology" +
    " with a minor in Technical & Science Communication. Originally from Englewood, CO, she is excited to be finishing up" +
    " her final year here at CSU and is hoping to pursue a career in Web Design and Development. She currently works as a Student" +
    " Technician for CSU Housing and Dining Tech Services and enjoys gaining experience working in IT. On top of her studies she's" +
    " also very involved in the FSL community and a four-year member of the Colorado State University Marching Band as a member of the" +
    " Sousaphone section.";


export default class About extends Component {
    render() {
        return (
            <Container id="about">
                {this.renderPageHeader()}
                <br/>
                {this.renderMissionStatement()}
                <br/>
                {this.renderMembersHeader()}
                {this.renderBiographyCards()}
            </Container>
        );
    }

    renderPageHeader() {
        return (
            <Row>
                <Col>
                    <h2>{CLIENT_TEAM_NAME}</h2>
                </Col>
                <Col id="closeAbout" xs='auto'>
                    <Button color="primary" onClick={this.props.closePage} xs={1}>
                        Close
                    </Button>
                </Col>
            </Row>
        );
    }

    renderMissionStatement() {
        return (
            <Row>
                <Col>
                    <Card>
                        <CardHeader><strong>Mission Statement</strong></CardHeader>
                        <CardBody>
                            <CardText>
                                Our goal is to construct large complex software systems that will utilize clean code,
                                configuration management, continuous integration, testing, project management and teamwork
                                to create a cohesive web development project in five 3-week sprints.
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }

    renderMembersHeader() {
        return (
            <Row>
                <Col>
                    <h4><strong>Members</strong></h4>
                </Col>
            </Row>
        );
    }

    renderBiographyCards() {
        return (
            <Row>
                <BioCard first="Edgar" last="Varela" bio={EdgarBio} imageURL={EdgarPicture}/>
                <BioCard first="Rylie" last="Denehan" bio={RylieBio} imageURL={RyliePicture}/>
                <BioCard first="Mikayla" last="Powell" bio={MikBio} imageURL={MikPicture}/>
                <BioCard first="Darin" last="Harter" bio={DarinBio} imageURL={DarinPicture}/>
            </Row>
        );
    }
}

class BioCard extends React.Component {
    render() {
        return (
            <Col xs="12" sm="12" md="6" lg="6" xl="4">
                <Card>
                    <CardImg top width="100%" src={this.props.imageURL} alt={this.props.first + "'s Image"}/>
                    <CardBody>
                        <CardTitle className="font-weight-bold">{this.props.first + " " + this.props.last}</CardTitle>
                        <CardText className="text-sm-left">{this.props.bio}</CardText>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}
