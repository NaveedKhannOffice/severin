import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

class ApiConfig extends Component {
    componentDidMount() {
        this.setupAxiosInterceptors();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.token !== this.props.token ||
            prevProps.role !== this.props.role
        ) {
            this.setupAxiosInterceptors(); // Reconfigure interceptors if token or role changes
        }
    }

    setupAxiosInterceptors = () => {
        const { token, role } = this.props; // Fetch the token from props

        // Remove existing interceptors to prevent duplication
        // axios.interceptors.request.eject(this.interceptor);

        // this.interceptor = axios.interceptors.request.use(
        //     (config) => {
        //         if (token) {
        //             config.headers["Authorization"] = `Bearer ${token}`;
        //         }
        //         return config;
        //     },
        //     (error) => {
        //         return Promise.reject(error);
        //     }
        // );

        // Remove existing interceptor if it exists to avoid duplication
        if (this.interceptor !== null) {
            axios.interceptors.request.eject(this.interceptor);
        }
        

        // Setup new Axios interceptor
        this.interceptor = axios.interceptors.request.use(
            (config) => {
                // console.log(role, "???????????????");
                // Add token to Authorization header if present
                if (token) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }

                // Use the role to prefix the API URL if not already prefixed
                // if (role && !config.url.startsWith(`${role}`)) {
                //     config.url = `${role == "service_provider" ? "service-provider" : "admin"}${config.url}`;
                // }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    };

    componentWillUnmount() {
        // Clean up interceptor when component is unmounted
        if (this.interceptor !== null) {
            axios.interceptors.request.eject(this.interceptor);
        }
    }

    render() {
        return null; // This component only sets up interceptors, no UI needed
    }
}

const mapStateToProps = (state) => ({
    token: state.token.token, // Adjust according to your Redux state structure
    role: state.role.role, // Fetch role from your Redux state
});

export default connect(mapStateToProps)(ApiConfig);
