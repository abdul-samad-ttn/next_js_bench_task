interface PostsLayoutProps {
    children: React.ReactNode;
    modal: React.ReactNode;
}

const PostsLayout = ({ children, modal }: PostsLayoutProps) => {
    return (
        <div className="flex flex-col gap-4">
            {children}
            {modal}
        </div>
    )
}

export default PostsLayout;