import React, { useEffect } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import { setCurrentUser as setCurrentUserRedux } from "./redux/current-user/current-user.actions";
import {
    resetGroupQuestions,
    updateGroupQuestion,
    updateSearchedQuestion,
    updateActiveQuestion,
} from "./redux/group-questions/group-questions.actions";
import { resetGroupMembers } from "./redux/group-members/group-members.actions";

import {
    getCurrentUser,
    updateCurrentUser,
} from "./local-storage/current-user";
import { getUserDetails } from "./api/api.user";

import "./styles/globals.scss";
import styles from "./styles/app.module.scss";
import wrapperStyles from "./styles/wrapper.module.scss";

import Header from "./components/header/header";
import Welcome from "./pages/welcome/welcome";
import SignIn from "./pages/sign-in/sign-in";
import Register from "./pages/register/register";
import SideBar from "./components/side-bar/side-bar";
import Groups from "./pages/groups/groups";
import Modal from "./components/modal/modal";
import CreateGroup from "./pages/create-group/create-group";
import Alert from "./components/alert/alert";
import GroupDetails from "./pages/group-details/group-details";
import SearchResults from "./pages/search-results/search-results";
import GroupExplore from "./pages/group-explore/group-explore";
import PostQuestion from "./pages/post-question/post-question";
import GroupHeader from "./components/group-header/group-header";
import JoinRequests from "./pages/join-requests/join-requests";
import SelectUsers from "./pages/add-members/select-users/select-users";
import FinalizeSelect from "./pages/add-members/finalize-select/finalize-select";
import GroupMembers from "./pages/group-members/group-members";
import QuestionSearch from "./pages/question-search/question-search";
import QuestionDetails from "./pages/question-details/question-details";
import QuestionHeader from "./components/question-header/question-header";
import UserProfile from "./pages/user-profile/user-profile";
import EditProfile from "./pages/edit-profile/edit-profile";
import ImageViewer from "./components/image-viewer/image-viewer";
import PostSolution from "./pages/post-solution/post-solution";
import ProposedSolutions from "./pages/proposed-solutions/proposed-solutions";
import UserQuestions from "./pages/user-questions/user-questions";
import UserNotifications from "./pages/user-notifications/user-notifications";
import SolutionPage from "./pages/solution/solution";
import GroupNotifications from "./pages/group-notifications/group-notifications";

const App = ({
    currentUserRedux,
    activeQuestion,
    location,
    history,
    activeSolution,
}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        //getting the currentUser from the local storage
        const currentUser = getCurrentUser();

        if (currentUser) {
            fetchUserDetails(currentUser._id, currentUser.token);
            return dispatch(setCurrentUserRedux(true));
        }

        dispatch(setCurrentUserRedux(false));
    }, []);

    const fetchUserDetails = async (userID, token) => {
        try {
            const result = await getUserDetails(userID, token);

            updateCurrentUser(result.user);
        } catch (error) {}
    };

    useEffect(() => {
        if (notInsideApp()) {
            if (currentUserRedux) {
                history.push("/groups/me");
            }
            return;
        }

        if (!currentUserRedux) {
            history.push("/signin");
        }
    }, [location, currentUserRedux]);

    useEffect(() => {
        if (
            location.pathname.includes("group") &&
            !location.pathname.includes("groups")
        ) {
            return;
        }

        dispatch(resetGroupQuestions());
        dispatch(resetGroupMembers());
    }, [location]);

    useEffect(() => {
        if (!activeQuestion) {
            return;
        }

        dispatch(
            updateGroupQuestion(activeQuestion.questionID, activeQuestion)
        );
        dispatch(
            updateSearchedQuestion(activeQuestion.questionID, activeQuestion)
        );
    }, [activeQuestion]);

    useEffect(() => {
        if (!activeSolution) {
            return;
        }

        if (activeSolution._id === activeQuestion.solution?._id) {
            return dispatch(updateActiveQuestion({ solution: activeSolution }));
        }

        dispatch(
            updateActiveQuestion({
                proposedSolutions: activeQuestion.proposedSolutions.map(
                    (proposedSolution) => {
                        if (proposedSolution._id === activeSolution._id) {
                            return { ...proposedSolution, ...activeSolution };
                        }

                        return proposedSolution;
                    }
                ),
            })
        );
    }, [activeSolution]);

    const renderSideBar = () => {
        if (notInsideApp()) {
            return null;
        }

        return <SideBar />;
    };

    const notInsideApp = () => {
        return (
            location.pathname.includes("signin") ||
            location.pathname.includes("register") ||
            location.pathname === "/"
        );
    };

    return (
        <div className={styles.app}>
            <Header />
            <Modal key="modal" />
            <Alert />
            <ImageViewer />
            <div className={notInsideApp() ? styles.mainWhole : styles.main}>
                {renderSideBar()}
                <Switch>
                    <section
                        className={`${
                            notInsideApp()
                                ? wrapperStyles.wrapper
                                : styles.content
                        }`}
                    >
                        <Route path="/" exact>
                            <Welcome />
                        </Route>
                        <Route path="/signin">
                            <SignIn />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/groups/:id">
                            {currentUserRedux ? (
                                <Groups />
                            ) : (
                                <Redirect to="/signin" />
                            )}
                        </Route>
                        <Route path="/group/create" exact>
                            <CreateGroup />
                        </Route>
                        <Route path="/group/:id/details">
                            <GroupDetails />
                        </Route>
                        <Route path="/group/:id/">
                            {!location.pathname.includes("details") &&
                                !location.pathname.includes("create") &&
                                !location.pathname.includes("/question/") && (
                                    <GroupHeader />
                                )}
                        </Route>
                        <Route path="/group/:id/explore">
                            {currentUserRedux ? (
                                <GroupExplore />
                            ) : (
                                <Redirect to="/signin" />
                            )}
                        </Route>
                        <Route path="/search">
                            <SearchResults />
                        </Route>
                        <Route path="/group/:id/ask">
                            <PostQuestion />
                        </Route>
                        <Route path="/group/:id/join-requests">
                            {currentUserRedux ? (
                                <JoinRequests />
                            ) : (
                                <Redirect to="/signin" />
                            )}
                        </Route>
                        <Route path="/group/:id/add-members/select">
                            <SelectUsers />
                        </Route>
                        <Route path="/group/:id/add-members/finalize">
                            <FinalizeSelect />
                        </Route>
                        <Route path="/group/:id/members">
                            <GroupMembers />
                        </Route>
                        <Route path="/group/:id/delegate-ownership">
                            <GroupMembers />
                        </Route>
                        <Route path="/group/:id/search">
                            <QuestionSearch searchType="group" />
                        </Route>
                        <Route path="/group/:groupID/question/:questionID/">
                            {currentUserRedux ? (
                                <QuestionHeader />
                            ) : (
                                <Redirect to="/signin" />
                            )}
                        </Route>
                        <Route
                            path="/group/:groupID/question/:questionID"
                            exact
                        >
                            {currentUserRedux ? (
                                <QuestionDetails />
                            ) : (
                                <Redirect to="/signin" />
                            )}
                        </Route>
                        <Route path="/profile/:userID" exact>
                            <UserProfile />
                        </Route>
                        <Route path="/profile/edit/me">
                            <EditProfile />
                        </Route>
                        <Route
                            path="/group/:groupID/question/:questionID/solve"
                            exact
                        >
                            {currentUserRedux ? (
                                <PostSolution type="solve" />
                            ) : (
                                <Redirect to="/signin" />
                            )}
                        </Route>
                        <Route
                            path="/group/:groupID/question/:questionID/propose"
                            exact
                        >
                            {currentUserRedux ? (
                                <PostSolution type="propose" />
                            ) : (
                                <Redirect to="/signin" />
                            )}
                        </Route>
                        <Route
                            path="/group/:groupID/question/:questionID/proposed-solutions"
                            exact
                        >
                            {currentUserRedux ? (
                                <ProposedSolutions />
                            ) : (
                                <Redirect to="/signin" />
                            )}
                        </Route>
                        <Route
                            path="/group/:groupID/question/:questionID/edit"
                            exact
                        >
                            {currentUserRedux ? (
                                <PostQuestion />
                            ) : (
                                <Redirect to="/signin" />
                            )}
                        </Route>
                        <Route
                            path="/group/:groupID/question/:questionID/solution/:solutionID/edit"
                            exact
                        >
                            {currentUserRedux ? (
                                <PostSolution type="edit" />
                            ) : (
                                <Redirect to="/signin" />
                            )}
                        </Route>
                        <Route path="/questions/:userID">
                            <UserQuestions />
                        </Route>
                        <Route path="/questions/:userID/search">
                            <QuestionSearch searchType="user" />
                        </Route>
                        <Route path="/notifications">
                            <UserNotifications />
                        </Route>
                        {/* <Route
                            path="/group/:groupID/question/:questionID/solution"
                            exact
                        >
                            <SolutionPage />
                        </Route> */}
                        <Route path = "/group/:groupID/notifications">
                            <GroupNotifications />
                        </Route>
                    </section>
                </Switch>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currentUserRedux: state.currentUser.currentUser,
        showMenu: state.menu.showMenu,
        activeQuestion: state.groupQuestions.activeQuestion,
        activeSolution: state.solution.activeSolution,
    };
};

export default connect(mapStateToProps)(withRouter(App));
