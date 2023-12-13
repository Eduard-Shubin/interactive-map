import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useState } from 'react'

const Vzvod = () => {
    const [selectedFile, setSelectedFile] = useState(null)

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        setSelectedFile(file)
    }

    const handleFileSubmit = () => {
        // Ваша логика обработки файла, например, отправка на сервер
        console.log('Выбранный файл:', selectedFile)
    }
    return (
        <HelmetProvider>
            <div>
                <Helmet>
                    <title>Мрачный взвод | Интерактивная карта</title>
                </Helmet>
            </div>
        </HelmetProvider>
    )
}

export default Vzvod
