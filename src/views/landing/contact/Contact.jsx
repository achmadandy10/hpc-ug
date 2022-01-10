import { ContactContainer, ContactContent, ContactDetail, ContactHeader } from "./Contact.elements"

const Contact = () => {
    return (
        <ContactContainer>
            <ContactHeader>Kontak</ContactHeader>

            <ContactContent>
                <ContactDetail>
                    <p>Media Information Center</p>
                    <p>Jl. Margonda Raya 100, Depok</p>
                    <p>West Java, INDONESIA - 16424</p>
                    <p>+62 - 21 - 78881112 ext. 234</p>
                    <p>email : mediacenter [@] gunadarma.ac.id</p>
                </ContactDetail>

                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3738983464596!2d106.85013191417762!3d-6.345603595407927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec4e3d00e813%3A0x5274dcbe2c3e0021!2sKampus%20F1%20Gunadarma%20University!5e0!3m2!1sen!2sid!4v1641800549427!5m2!1sen!2sid" 
                    title="Kampus F1 Gunadarma"
                    height={ 300 }
                >
                </iframe>
            </ContactContent>
        </ContactContainer>
    )
}

export default Contact