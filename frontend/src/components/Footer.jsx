const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 text-center py-4 mt-10 border-t border-gray-700">
      <p>
        © {new Date().getFullYear()}{" "}
        <span className="text-orange-500">LeadManager</span>. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
