var convertBST = function(root) {
  let sum=0;
  const traverse=(root)=>{
    if(!root) return
    traverse(root.right);
    sum+=root.val;
    root.val=sum
    traverse(root.left);
  }
  traverse(root)
  return root
};
