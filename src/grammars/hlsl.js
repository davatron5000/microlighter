export default {
  name: "hlsl",
  displayName: "HLSL",
  scopeName: "source.hlsl",
  patterns: [
    {
      begin: /\/\*/dgv,
      end: /\*\//dgv,
      name: "comment.line.block.hlsl"
    },
    {
      begin: /\/\//dgv,
      end: /(?=\n?$)/dgv,
      name: "comment.line.double-slash.hlsl"
    },
    {
      match: /\b[0-9]+\.[0-9]*([Ff])?\b/dgv,
      name: "constant.numeric.decimal.hlsl"
    },
    {
      match: /(\.([0-9]+)([Ff])?)\b/dgv,
      name: "constant.numeric.decimal.hlsl"
    },
    {
      match: /\b([0-9]+([Ff])?)\b/dgv,
      name: "constant.numeric.decimal.hlsl"
    },
    {
      match: /\b(0([Xx])\p{AHex}+)\b/dgv,
      name: "constant.numeric.hex.hlsl"
    },
    {
      match: /\b(false|true)\b/dgv,
      name: "constant.language.hlsl"
    },
    {
      match: /^\p{space}*#\p{space}*(define|elif|else|endif|ifdef|ifndef|if|undef|include|line|error|pragma)/dgv,
      name: "keyword.preprocessor.hlsl"
    },
    {
      match: /\b(break|case|continue|default|discard|do|else|for|if|return|switch|while)\b/dgv,
      name: "keyword.control.hlsl"
    },
    {
      match: /\b(compile)\b/dgv,
      name: "keyword.control.fx.hlsl"
    },
    {
      match: /\b(typedef)\b/dgv,
      name: "keyword.typealias.hlsl"
    },
    {
      match: /\b(bool([1-4](x[1-4])?)?|double([1-4](x[1-4])?)?|dword|float([1-4](x[1-4])?)?|half([1-4](x[1-4])?)?|int([1-4](x[1-4])?)?|matrix|min10float([1-4](x[1-4])?)?|min12int([1-4](x[1-4])?)?|min16float([1-4](x[1-4])?)?|min16int([1-4](x[1-4])?)?|min16uint([1-4](x[1-4])?)?|unsigned|uint([1-4](x[1-4])?)?|vector|void)\b/dgv,
      name: "storage.type.basic.hlsl"
    },
    {
      match: /\b([A-Z_a-z][0-9A-Z_a-z]*)(?=\p{space}*\()/dgv,
      name: "support.function.hlsl"
    },
    {
      match: /(?<=:\p{space}?)(?:BINORMAL[0-9]*|BLENDINDICES[0-9]*|BLENDWEIGHT[0-9]*|COLOR[0-9]*|NORMAL[0-9]*|POSITIONT?|PSIZE[0-9]*|TANGENT[0-9]*|TEXCOORD[0-9]*|FOG|TESSFACTOR[0-9]*|VFACE|VPOS|DEPTH[0-9]*)\b/dgiv,
      name: "support.variable.semantic.hlsl"
    },
    {
      match: /(?<=:\p{space}?)SV_(?:ClipDistance[0-9]*|CullDistance[0-9]*|Coverage|Depth|DepthGreaterEqual[0-9]*|DepthLessEqual[0-9]*|InstanceID|IsFrontFace|Position|RenderTargetArrayIndex|SampleIndex|StencilRef|Target[0-7]?|VertexID|ViewportArrayIndex)\b/dgiv,
      name: "support.variable.semantic.sm4.hlsl"
    },
    {
      match: /(?<=:\p{space}?)SV_(?:DispatchThreadID|DomainLocation|GroupID|GroupIndex|GroupThreadID|GSInstanceID|InsideTessFactor|OutputControlPointID|TessFactor)\b/dgiv,
      name: "support.variable.semantic.sm5.hlsl"
    },
    {
      match: /(?<=:\p{space}?)SV_(?:InnerCoverage|StencilRef)\b/dgiv,
      name: "support.variable.semantic.sm5_1.hlsl"
    },
    {
      match: /\b(column_major|const|export|extern|globallycoherent|groupshared|inline|inout|in|out|precise|row_major|shared|static|uniform|volatile)\b/dgv,
      name: "storage.modifier.hlsl"
    },
    {
      match: /\b([su]norm)\b/dgv,
      name: "storage.modifier.float.hlsl"
    },
    {
      match: /\b(packoffset|register)\b/dgv,
      name: "storage.modifier.postfix.hlsl"
    },
    {
      match: /\b(centroid|linear|nointerpolation|noperspective|sample)\b/dgv,
      name: "storage.modifier.interpolation.hlsl"
    },
    {
      match: /\b(lineadj|line|point|triangle|triangleadj)\b/dgv,
      name: "storage.modifier.geometryshader.hlsl"
    },
    {
      match: /\b(string)\b/dgv,
      name: "support.type.other.hlsl"
    },
    {
      match: /\b(AppendStructuredBuffer|Buffer|ByteAddressBuffer|ConstantBuffer|ConsumeStructuredBuffer|InputPatch|OutputPatch)\b/dgv,
      name: "support.type.object.hlsl"
    },
    {
      match: /\b(RasterizerOrdered(?:Buffer|ByteAddressBuffer|StructuredBuffer|Texture1D|Texture1DArray|Texture2D|Texture2DArray|Texture3D))\b/dgv,
      name: "support.type.object.rasterizerordered.hlsl"
    },
    {
      match: /\b(RW(?:Buffer|ByteAddressBuffer|StructuredBuffer|Texture1D|Texture1DArray|Texture2D|Texture2DArray|Texture3D))\b/dgv,
      name: "support.type.object.rw.hlsl"
    },
    {
      match: /\b((?:Line|Point|Triangle)Stream)\b/dgv,
      name: "support.type.object.geometryshader.hlsl"
    },
    {
      match: /\b(sampler(?:|1D|2D|3D|CUBE|_state))\b/dgv,
      name: "support.type.sampler.legacy.hlsl"
    },
    {
      match: /\b(Sampler(?:|Comparison)State)\b/dgv,
      name: "support.type.sampler.hlsl"
    },
    {
      match: /\b(texture(?:2D|CUBE))\b/dgv,
      name: "support.type.texture.legacy.hlsl"
    },
    {
      match: /\b(Texture(?:1D|1DArray|2D|2DArray|2DMS|2DMSArray|3D|Cube|CubeArray))\b/dgv,
      name: "support.type.texture.hlsl"
    },
    {
      match: /\b(cbuffer|class|interface|namespace|struct|tbuffer)\b/dgv,
      name: "storage.type.structured.hlsl"
    },
    {
      match: /\b(FALSE|TRUE|NULL)\b/dgv,
      name: "support.constant.property-value.fx.hlsl"
    },
    {
      match: /\b((?:Blend|DepthStencil|Rasterizer)State)\b/dgv,
      name: "support.type.fx.hlsl"
    },
    {
      match: /\b(technique|Technique|technique10|technique11|pass)\b/dgv,
      name: "storage.type.fx.technique.hlsl"
    },
    {
      match: /\b(AlphaToCoverageEnable|BlendEnable|SrcBlend|DestBlend|BlendOp|SrcBlendAlpha|DestBlendAlpha|BlendOpAlpha|RenderTargetWriteMask)\b/dgv,
      name: "meta.object-literal.key.fx.blendstate.hlsl"
    },
    {
      match: /\b(DepthEnable|DepthWriteMask|DepthFunc|StencilEnable|StencilReadMask|StencilWriteMask|FrontFaceStencilFail|FrontFaceStencilZFail|FrontFaceStencilPass|FrontFaceStencilFunc|BackFaceStencilFail|BackFaceStencilZFail|BackFaceStencilPass|BackFaceStencilFunc)\b/dgv,
      name: "meta.object-literal.key.fx.depthstencilstate.hlsl"
    },
    {
      match: /\b(FillMode|CullMode|FrontCounterClockwise|DepthBias|DepthBiasClamp|SlopeScaleDepthBias|ZClipEnable|ScissorEnable|MultiSampleEnable|AntiAliasedLineEnable)\b/dgv,
      name: "meta.object-literal.key.fx.rasterizerstate.hlsl"
    },
    {
      match: /\b(Filter|AddressU|AddressV|AddressW|MipLODBias|MaxAnisotropy|ComparisonFunc|BorderColor|MinLOD|MaxLOD)\b/dgv,
      name: "meta.object-literal.key.fx.samplerstate.hlsl"
    },
    {
      match: /\b(?:ZERO|ONE|SRC_COLOR|INV_SRC_COLOR|SRC_ALPHA|INV_SRC_ALPHA|DEST_ALPHA|INV_DEST_ALPHA|DEST_COLOR|INV_DEST_COLOR|SRC_ALPHA_SAT|BLEND_FACTOR|INV_BLEND_FACTOR|SRC1_COLOR|INV_SRC1_COLOR|SRC1_ALPHA|INV_SRC1_ALPHA)\b/dgiv,
      name: "support.constant.property-value.fx.blend.hlsl"
    },
    {
      match: /\b(?:ADD|SUBTRACT|REV_SUBTRACT|MIN|MAX)\b/dgiv,
      name: "support.constant.property-value.fx.blendop.hlsl"
    },
    {
      match: /\bALL\b/dgiv,
      name: "support.constant.property-value.fx.depthwritemask.hlsl"
    },
    {
      match: /\b(?:NEVER|LESS|EQUAL|LESS_EQUAL|GREATER|NOT_EQUAL|GREATER_EQUAL|ALWAYS)\b/dgiv,
      name: "support.constant.property-value.fx.comparisonfunc.hlsl"
    },
    {
      match: /\b(?:KEEP|REPLACE|INCR_SAT|DECR_SAT|INVERT|INCR|DECR)\b/dgiv,
      name: "support.constant.property-value.fx.stencilop.hlsl"
    },
    {
      match: /\b(?:WIREFRAME|SOLID)\b/dgiv,
      name: "support.constant.property-value.fx.fillmode.hlsl"
    },
    {
      match: /\b(?:NONE|FRONT|BACK)\b/dgiv,
      name: "support.constant.property-value.fx.cullmode.hlsl"
    },
    {
      match: /\b(?:MIN_MAG_MIP_POINT|MIN_MAG_POINT_MIP_LINEAR|MIN_POINT_MAG_LINEAR_MIP_POINT|MIN_POINT_MAG_MIP_LINEAR|MIN_LINEAR_MAG_MIP_POINT|MIN_LINEAR_MAG_POINT_MIP_LINEAR|MIN_MAG_LINEAR_MIP_POINT|MIN_MAG_MIP_LINEAR|ANISOTROPIC|COMPARISON_MIN_MAG_MIP_POINT|COMPARISON_MIN_MAG_POINT_MIP_LINEAR|COMPARISON_MIN_POINT_MAG_LINEAR_MIP_POINT|COMPARISON_MIN_POINT_MAG_MIP_LINEAR|COMPARISON_MIN_LINEAR_MAG_MIP_POINT|COMPARISON_MIN_LINEAR_MAG_POINT_MIP_LINEAR|COMPARISON_MIN_MAG_LINEAR_MIP_POINT|COMPARISON_MIN_MAG_MIP_LINEAR|COMPARISON_ANISOTROPIC|TEXT_1BIT)\b/dgiv,
      name: "support.constant.property-value.fx.filter.hlsl"
    },
    {
      match: /\b(?:WRAP|MIRROR|CLAMP|BORDER|MIRROR_ONCE)\b/dgiv,
      name: "support.constant.property-value.fx.textureaddressmode.hlsl"
    },
    {
      begin: /"/dgv,
      end: /"/dgv,
      name: "string.quoted.double.hlsl",
      patterns: [
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.hlsl"
        }
      ]
    }
  ],
  dependencies: []
};
