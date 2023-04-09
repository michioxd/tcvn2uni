import { Card, CardContent, Container } from "@mui/material";
import './scss/App.scss';
import Header from "./components/Header"
import MainPage from "./components/MainPage"
import Footer from "./components/Footer"
import { Route, Routes } from "react-router-dom"
import ConvertText from "./components/ConvertText"

function App() {


    return (
        <>
            <Header />
            <Container>
                <Card sx={{ mt: 2 }}>
                    <CardContent>
                        <Routes>
                            <Route index element={<MainPage />} />
                            <Route path="*" element={<MainPage />} />
                            <Route path="/text" element={<ConvertText />} />
                        </Routes>
                    </CardContent>
                </Card>
            </Container>
            <Footer />
        </>
    )
}

export default App
