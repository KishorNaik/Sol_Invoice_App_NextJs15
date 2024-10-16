import Container from "@/components/Container";

const Footer = () => {
  return (
    <>
      <footer className="mt-12 mb-8">
        <Container className="flex justify-between items-center gap-4 p-4">
          <p className="text-sm">
            Invoicepedia &copy; {new Date().getFullYear()}
          </p>
          <p className="text-sm">Created By Kishor Naik</p>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
