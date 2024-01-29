export default {
    setPath(...paths: (number | string | undefined)[]) {
        let returnPath = "";
        for (let path of paths) {
            if (path) {
                if (
                    typeof path === "string" &&
                    path.length > 0 &&
                    path.startsWith("/")
                ) {
                    path = path.slice(1);
                }

                returnPath += `/${path}`;
            }
        }
        return returnPath;
    }
}