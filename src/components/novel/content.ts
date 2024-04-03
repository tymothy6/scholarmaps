export const defaultEditorContent = {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: { level: 1 },
        content: [{ type: "text", text: "Novel" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href: "https://github.com/steven-tey/novel",
                  target: "_blank",
                },
              },
            ],
            text: "Novel",
          },
          {
            type: "text",
            text: " is a Notion-style WYSIWYG editor with AI-powered autocompletion. Built with ",
          },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href: "https://tiptap.dev/",
                  target: "_blank",
                },
              },
            ],
            text: "Tiptap",
          },
          { type: "text", text: " + " },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href: "https://sdk.vercel.ai/docs",
                  target: "_blank",
                },
              },
            ],
            text: "Vercel AI SDK",
          },
          { type: "text", text: "." },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "Installation" }],
      },
      {
        type: "codeBlock",
        attrs: { language: null },
        content: [{ type: "text", text: "npm i novel" }],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "Features" }],
      },
      {
        type: "orderedList",
        attrs: { tight: true, start: 1 },
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Slash menu & bubble menu" }],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "AI autocomplete (type " },
                  { type: "text", marks: [{ type: "code" }], text: "⌘J" },
                  {
                    type: "text",
                    text: " to activate, or select from bubble menu)",
                  },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "Image uploads (drag & drop / copy & paste, or select from slash menu) ",
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: "horizontalRule" },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "Learn more" }],
      },
      {
        type: "taskList",
        content: [
          {
            type: "taskItem",
            attrs: { checked: false },
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "Star on " },
                  {
                    type: "text",
                    marks: [
                      {
                        type: "link",
                        attrs: {
                          href: "https://github.com/steven-tey/novel",
                          target: "_blank",
                        },
                      },
                    ],
                    text: "GitHub",
                  },
                ],
              },
            ],
          },
          {
            type: "taskItem",
            attrs: { checked: false },
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "Install the " },
                  {
                    type: "text",
                    marks: [
                      {
                        type: "link",
                        attrs: {
                          href: "https://www.npmjs.com/package/novel",
                          target: "_blank",
                        },
                      },
                    ],
                    text: "npm package",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };