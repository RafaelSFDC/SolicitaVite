import { motion, AnimatePresence } from "framer-motion";
const ButtonMotion = ({ children, onClick, className, type }) => {
    return (
        <AnimatePresence>
            <motion.button
                onClick={onClick}
                className={className}
                type={type}
                transition={{
                    duration: 0.5,
                    ease: "easeInOut"
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
            >
                {children}
            </motion.button>
        </AnimatePresence>
    );
};

export default ButtonMotion;
