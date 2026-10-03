export default {
  name: "shaderlab",
  displayName: "ShaderLab",
  aliases: [
    "shader"
  ],
  scopeName: "source.shaderlab",
  patterns: [
    {
      begin: /\/\//dgv,
      end: /(?=\n?$)/dgv,
      name: "comment.line.double-slash.shaderlab"
    },
    {
      match: /\b(?:Range|Float|Int|Color|Vector|2D|3D|Cube|Any)\b/dgiv,
      name: "support.type.basic.shaderlab"
    },
    { include: "#numbers" },
    {
      match: /\b(?:Shader|Properties|SubShader|Pass|Category)\b/dgiv,
      name: "storage.type.structure.shaderlab"
    },
    {
      match: /\b(?:Name|Tags|Fallback|CustomEditor|Cull|ZWrite|ZTest|Offset|Blend|BlendOp|ColorMask|AlphaToMask|LOD|Lighting|Stencil|Ref|ReadMask|WriteMask|Comp|CompBack|CompFront|Fail|ZFail|UsePass|GrabPass|Dependency|Material|Diffuse|Ambient|Shininess|Specular|Emission|Fog|Mode|Density|SeparateSpecular|SetTexture|Combine|ConstantColor|Matrix|AlphaTest|ColorMaterial|BindChannels|Bind)\b/dgiv,
      name: "support.type.propertyname.shaderlab"
    },
    {
      match: /\b(?:Back|Front|On|Off|[ABGR]{1,3}|AmbientAndDiffuse|Emission)\b/dgiv,
      name: "support.constant.property-value.shaderlab"
    },
    {
      match: /\b(?:Less|Greater|LEqual|GEqual|Equal|NotEqual|Always|Never)\b/dgiv,
      name: "support.constant.property-value.comparisonfunction.shaderlab"
    },
    {
      match: /\b(?:Keep|Zero|Replace|IncrSat|DecrSat|Invert|IncrWrap|DecrWrap)\b/dgiv,
      name: "support.constant.property-value.stenciloperation.shaderlab"
    },
    {
      match: /\b(?:Previous|Primary|Texture|Constant|Lerp|Double|Quad|Alpha)\b/dgiv,
      name: "support.constant.property-value.texturecombiners.shaderlab"
    },
    {
      match: /\b(?:Global|Linear|Exp2?)\b/dgiv,
      name: "support.constant.property-value.fog.shaderlab"
    },
    {
      match: /\b(?:Vertex|Normal|Tangent|TexCoord0|TexCoord1)\b/dgiv,
      name: "support.constant.property-value.bindchannels.shaderlab"
    },
    {
      match: /\b(?:Add|Sub|RevSub|Min|Max|LogicalClear|LogicalSet|LogicalCopyInverted|LogicalCopy|LogicalNoop|LogicalInvert|LogicalAnd|LogicalNand|LogicalOr|LogicalNor|LogicalXor|LogicalEquiv|LogicalAndReverse|LogicalAndInverted|LogicalOrReverse|LogicalOrInverted)\b/dgiv,
      name: "support.constant.property-value.blendoperations.shaderlab"
    },
    {
      match: /\b(?:One|Zero|SrcColor|SrcAlpha|DstColor|DstAlpha|OneMinusSrcColor|OneMinusSrcAlpha|OneMinusDstColor|OneMinusDstAlpha)\b/dgiv,
      name: "support.constant.property-value.blendfactors.shaderlab"
    },
    {
      match: /\[([A-Z_a-z][0-9A-Z_a-z]*)\](?!\p{space}*[A-Z_a-z][0-9A-Z_a-z]*\p{space}*\(")/dgv,
      name: "support.variable.reference.shaderlab"
    },
    {
      begin: /(\[)/dgv,
      end: /(\])/dgv,
      name: "meta.attribute.shaderlab",
      patterns: [
        {
          match: {
            G: [/￿([A-Za-z]+)\b/dgv, /([A-Za-z]+)\b/dgvy]
          },
          name: "support.type.attributename.shaderlab"
        },
        { include: "#numbers" }
      ]
    },
    {
      match: /\b([A-Z_a-z][0-9A-Z_a-z]*)\p{space}*\(/dgv,
      name: "support.variable.declaration.shaderlab"
    },
    {
      begin: /\b(CG(?:PROGRAM|INCLUDE))\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.other" }
      },
      end: /\b(ENDCG)\b/dgv,
      endCaptures: {
        "1": { name: "keyword.other" }
      },
      name: "meta.cgblock",
      patterns: [
        { include: "#hlsl-embedded" }
      ]
    },
    {
      begin: /\b(HLSL(?:PROGRAM|INCLUDE))\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.other" }
      },
      end: /\b(ENDHLSL)\b/dgv,
      endCaptures: {
        "1": { name: "keyword.other" }
      },
      name: "meta.hlslblock",
      patterns: [
        { include: "#hlsl-embedded" }
      ]
    },
    {
      begin: /"/dgv,
      end: /"/dgv,
      name: "string.quoted.double.shaderlab"
    }
  ],
  repository: {
    "hlsl-embedded": {
      patterns: [
        { include: "source.hlsl" },
        {
          match: /\b(fixed([1-4](x[1-4])?)?)\b/dgv,
          name: "storage.type.basic.shaderlab"
        },
        {
          match: /\b(UNITY_MATRIX_MVP?|UNITY_MATRIX_M|UNITY_MATRIX_V|UNITY_MATRIX_P|UNITY_MATRIX_VP|UNITY_MATRIX_T_MV|UNITY_MATRIX_I_V|UNITY_MATRIX_IT_MV|_Object2World|_World2Object|unity_ObjectToWorld|unity_WorldToObject)\b/dgv,
          name: "support.variable.transformations.shaderlab"
        },
        {
          match: /\b(_WorldSpaceCameraPos|_ProjectionParams|_ScreenParams|_ZBufferParams|unity_OrthoParams|unity_CameraProjection|unity_CameraInvProjection|unity_CameraWorldClipPlanes)\b/dgv,
          name: "support.variable.camera.shaderlab"
        },
        {
          match: /\b((?:_|_Sin|_Cos|unity_Delta)Time)\b/dgv,
          name: "support.variable.time.shaderlab"
        },
        {
          match: /\b(_LightColor0|_WorldSpaceLightPos0|_LightMatrix0|unity_4LightPosX0|unity_4LightPosY0|unity_4LightPosZ0|unity_4LightAtten0|unity_LightColor|_LightColor|unity_LightPosition|unity_LightAtten|unity_SpotDirection)\b/dgv,
          name: "support.variable.lighting.shaderlab"
        },
        {
          match: /\b(unity_AmbientSky|unity_AmbientEquator|unity_AmbientGround|UNITY_LIGHTMODEL_AMBIENT|unity_FogColor|unity_FogParams)\b/dgv,
          name: "support.variable.fog.shaderlab"
        },
        {
          match: /\b(unity_LODFade)\b/dgv,
          name: "support.variable.various.shaderlab"
        },
        {
          match: /\b(SHADER_API_(?:D3D9|D3D11|GLCORE|OPENGL|GLES3??|METAL|D3D11_9X|PSSL|XBOXONE|PSP2|WIIU|MOBILE|GLSL))\b/dgv,
          name: "support.variable.preprocessor.targetplatform.shaderlab"
        },
        {
          match: /\b(SHADER_TARGET)\b/dgv,
          name: "support.variable.preprocessor.targetmodel.shaderlab"
        },
        {
          match: /\b(UNITY_VERSION)\b/dgv,
          name: "support.variable.preprocessor.unityversion.shaderlab"
        },
        {
          match: /\b(UNITY_(?:BRANCH|FLATTEN|NO_SCREENSPACE_SHADOWS|NO_LINEAR_COLORSPACE|NO_RGBM|NO_DXT5nm|FRAMEBUFFER_FETCH_AVAILABLE|USE_RGBA_FOR_POINT_SHADOWS|ATTEN_CHANNEL|HALF_TEXEL_OFFSET|UV_STARTS_AT_TOP|MIGHT_NOT_HAVE_DEPTH_Texture|NEAR_CLIP_VALUE|VPOS_TYPE|CAN_COMPILE_TESSELLATION|COMPILER_HLSL|COMPILER_HLSL2GLSL|COMPILER_CG|REVERSED_Z))\b/dgv,
          name: "support.variable.preprocessor.platformdifference.shaderlab"
        },
        {
          match: /\b(UNITY_PASS_(?:FORWARDBASE|FORWARDADD|DEFERRED|SHADOWCASTER|PREPASSBASE|PREPASSFINAL))\b/dgv,
          name: "support.variable.preprocessor.texture2D.shaderlab"
        },
        {
          match: /\b(appdata_(?:base|tan|full|img))\b/dgv,
          name: "support.class.structures.shaderlab"
        },
        {
          match: /\b(SurfaceOutputStandardSpecular|SurfaceOutputStandard|SurfaceOutput|Input)\b/dgv,
          name: "support.class.surface.shaderlab"
        }
      ]
    },
    numbers: {
      patterns: [
        {
          match: /\b([0-9]+\.?[0-9]*)\b/dgv,
          name: "constant.numeric.shaderlab"
        }
      ]
    }
  },
  dependencies: [
    "hlsl"
  ]
};
