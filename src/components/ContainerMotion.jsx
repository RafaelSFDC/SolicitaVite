import { motion, AnimatePresence } from "framer-motion";

const ContainerMotion = ({ children, className }) => {
    return (
        <AnimatePresence>
            <motion.div
                className={className ? className : "container"}
                transition={{
                    duration: 60,
                    ease: "easeInOut"
                }}
                initial={{ x: -150, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 200 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
export default ContainerMotion;
