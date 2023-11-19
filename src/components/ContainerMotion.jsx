import { motion, AnimatePresence } from "framer-motion";

const ContainerMotion = ({ children, className }) => {
    return (
        <AnimatePresence>
            <motion.div
                className={className ? className : "container"}
                transition={{
                    duration: 0.2,
                    ease: "easeInOut"
                }}
                initial={{ scale: 0.99 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
export default ContainerMotion;
