import React, { memo } from "react";
import axios from "axios";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import InlineEditor from "@ckeditor/ckeditor5-build-inline";

const Editor = memo(({ content, setContent }) => {
    const uploadAdapter = (loader) => {
        return {
            upload: () => {
                const formData = new FormData();
                loader.file.then(async (file) => {
                    formData.append("file", file);

                    let json = null;

                    try {
                        const response = await axios.post(
                            "/tempo_file",
                            formData,
                            {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                },
                            }
                        );
                    } catch (err) {
                        json = err.response.data;
                        alert(`${json.rtmsg}`);
                    }
                });
            },
        };
    };

    function uploadPlugin (editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        };
    };

    return (
        <CKEditor
            editor={InlineEditor}
			config={{
				extraPlugins: [uploadPlugin]
			}}
            onChange={(event, editor) => {
                const data = editor.getData();
				setContent(data);
            }}
			data={content}
        />
    );
});

export default Editor;
