/** biome-ignore-all lint/complexity/noForEach: Allow */
/** biome-ignore-all lint/complexity/noExcessiveCognitiveComplexity: Allow */
/** biome-ignore-all lint/suspicious/noEvolvingTypes: Allow */

// converts radix-ui asChild to base-ui render={} prop
// bunx jscodeshift -t devtools/deradix.ts . --extensions=tsx --parser=tsx

// @ts-expect-error
module.exports = function transform(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let changed = false;

  // @ts-expect-error
  const isEmptyText = (node) => node.type === 'JSXText' && node.value.trim() === '';

  // @ts-expect-error
  root.find(j.JSXElement).forEach((path) => {
    const opening = path.node.openingElement;
    const attrs = opening.attributes || [];

    // @ts-expect-error
    const asIdx = attrs.findIndex((a) => a.type === 'JSXAttribute' && a.name && a.name.name === 'asChild');
    if (asIdx === -1) {
      return; // No asChild prop found
    }

    const asAttr = attrs[asIdx];
    const isExplicitFalse =
      asAttr.value &&
      asAttr.value.type === 'JSXExpressionContainer' &&
      asAttr.value.expression.type === 'BooleanLiteral' &&
      asAttr.value.expression.value === false;
    if (isExplicitFalse) {
      return; // asChild={false}, skip
    }

    // @ts-expect-error
    const nonWsChildren = (path.node.children || []).filter((c) => !isEmptyText(c));

    // The asChild prop typically expects a single direct child or a single
    // expression container wrapping a renderable element/expression.
    if (nonWsChildren.length !== 1) {
      return; // Cannot reliably migrate if multiple or no children
    }

    const soleChild = nonWsChildren[0];
    let renderPropValue = null; // This will hold the AST node for render={...}
    let newParentChildren = []; // Children that will remain inside the parent component

    if (soleChild.type === 'JSXElement') {
      // Case: <Parent asChild><Child>...</Child></Parent>
      // The child's content becomes the new parent's content.
      newParentChildren = soleChild.children || [];
      // The render prop receives a self-closing version of the child.
      renderPropValue = j.jsxElement(
        j.jsxOpeningElement(
          soleChild.openingElement.name,
          soleChild.openingElement.attributes || [],
          true // Self-closing
        ),
        null, // No closing element for self-closing
        [] // No children for self-closing
      );
      // Preserve TS type parameters if present
      if (soleChild.openingElement.typeParameters) {
        renderPropValue.openingElement.typeParameters = soleChild.openingElement.typeParameters;
      }
    } else if (soleChild.type === 'JSXExpressionContainer') {
      // Case: <Parent asChild>{expression}</Parent>
      const expression = soleChild.expression;

      if (expression.type === 'JSXElement') {
        // Case: <Parent asChild>{<Child>...</Child>}</Parent>
        // Similar to the direct JSXElement case, but the child is wrapped.
        newParentChildren = expression.children || [];
        renderPropValue = j.jsxElement(
          j.jsxOpeningElement(
            expression.openingElement.name,
            expression.openingElement.attributes || [],
            true // Self-closing
          ),
          null,
          []
        );
        if (expression.openingElement.typeParameters) {
          renderPropValue.openingElement.typeParameters = expression.openingElement.typeParameters;
        }
      } else if (expression.type === 'ConditionalExpression' || expression.type === 'LogicalExpression') {
        // Case: <Parent asChild>{cond ? <Child1/> : <Child2/>}</Parent>
        // Case: <Parent asChild>{cond && <Child/>}</Parent>
        // The entire expression becomes the value of the render prop.
        renderPropValue = expression;
        // Conditional/Logical expressions don't have children to hoist.
        newParentChildren = [];
      } else {
        // Other types of expressions (e.g., {variable}, {1+2}) are not typical
        // for asChild and cannot be directly converted to render={JSXElement}.
        return;
      }
    } else {
      // If the sole child is not a JSXElement or JSXExpressionContainer
      // (e.g., plain JSXText like `<div>Text</div>`), it's not a valid
      // asChild usage to convert to render={JSXElement}.
      return;
    }

    if (!renderPropValue) {
      // Should not be reached if checks are robust, but a safeguard.
      return;
    }

    // Build the new render attribute
    const renderAttr = j.jsxAttribute(j.jsxIdentifier('render'), j.jsxExpressionContainer(renderPropValue));

    // Remove the original asChild attribute
    opening.attributes.splice(asIdx, 1);

    // Add or replace the render attribute
    const existingRenderIdx = (opening.attributes || []).findIndex(
      // @ts-expect-error
      (a) => a.type === 'JSXAttribute' && a.name && a.name.name === 'render'
    );
    if (existingRenderIdx === -1) {
      opening.attributes.push(renderAttr);
    } else {
      // Replace existing render prop if it somehow exists (unlikely but safe)
      opening.attributes[existingRenderIdx] = renderAttr;
    }

    // Update the parent's children with the hoisted content
    path.node.children = newParentChildren;

    changed = true;
  });

  return changed ? root.toSource() : null;
};
